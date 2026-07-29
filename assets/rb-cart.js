/**
 * RocketBoyz Cart Store — syncs Shopify cart API with localStorage
 * Events: dispatches 'rb-cart' on every change; listen for 'rb-cart-open' to open drawer
 */
(function () {
  'use strict';

  const K = { ITEMS: 'rb_cart_items', PROTECT: 'rb_protect', TERMS: 'rb_terms' };

  /* Terms acceptance is per-page-load only — never written to localStorage, so
     a previous session can't leave the box pre-ticked. */
  let _termsAccepted = false;

  /* Clear any acceptance persisted by the previous implementation. */
  try { localStorage.removeItem(K.TERMS); } catch (e) {}

  window.RBCart = {
    // ── Getters ────────────────────────────────────────────────
    getItems() {
      try { return JSON.parse(localStorage.getItem(K.ITEMS) || '[]'); } catch { return []; }
    },
    // Shipping protection is always on — it is not an opt-in any more, so the
    // UI shows it as an included line rather than a toggle.
    getProtect() {
      return true;
    },
    // Terms acceptance is deliberately NOT persisted. It lives in memory for
    // the current page only, so the box is always unchecked on load and the
    // shopper has to tick it themselves every time.
    getTerms() {
      return _termsAccepted;
    },
    getCount() {
      return this.getItems().reduce(function (s, i) { return s + i.qty; }, 0);
    },
    getSubtotal() {
      var base = this.getItems().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      return base + (this.getProtect() ? 155 : 0);
    },

    // ── Setters ────────────────────────────────────────────────
    // Kept for API compatibility — protection is mandatory, so this is a no-op.
    setProtect() {
      this.emit();
    },
    setTerms(v) {
      _termsAccepted = !!v;
      this.emit();
    },

    // Identify the ShipInsure / package-protection line item so it is never
    // shown as an editable cart product. It stays in the real Shopify cart
    // (auto-added by the ShipInsure app) but is represented in our UI by the
    // dedicated "Shipping Protection" row/toggle instead of a normal line item.
    isProtectionItem(i) {
      var t  = (i.product_title || i.title || '').toLowerCase();
      var v  = (i.vendor || '').toLowerCase();
      var pt = (i.product_type || '').toLowerCase();
      var h  = (i.handle || '').toLowerCase();
      if (v.indexOf('shipinsure') !== -1) return true;
      if (t.indexOf('shipinsure') !== -1) return true;
      if (t.indexOf('package protection') !== -1) return true;
      if (t.indexOf('shipping protection') !== -1) return true;
      if (pt.indexOf('protection') !== -1) return true;
      if (h.indexOf('shipinsure') !== -1 || h.indexOf('package-protection') !== -1 || h.indexOf('shipping-protection') !== -1) return true;
      if (i.properties) {
        for (var k in i.properties) {
          if (k.toLowerCase().indexOf('shipinsure') !== -1) return true;
        }
      }
      return false;
    },

    // ── Shopify cart operations ────────────────────────────────
    async fetchCart() {
      var self = this;
      try {
        var r = await fetch('/cart.js');
        var cart = await r.json();
        var items = cart.items
          .filter(function (i) { return !self.isProtectionItem(i); })
          .map(function (i) {
            return {
              key: i.key,
              vid: i.variant_id || i.id,
              name: i.product_title,
              sub: (i.variant_title && i.variant_title !== 'Default Title') ? i.variant_title : '',
              price: i.price,
              qty: i.quantity,
              img: i.featured_image ? i.featured_image.url : (i.image || '')
            };
          });
        localStorage.setItem(K.ITEMS, JSON.stringify(items));
        this.emit();
        return items;
      } catch (e) {
        return this.getItems();
      }
    },

    // Optimistically update quantity in localStorage + repaint the UI
    // immediately, so +/- feels instant instead of waiting on the network.
    setLocalQty(key, qty) {
      var items = this.getItems().map(function (i) {
        return i.key === key ? Object.assign({}, i, { qty: qty }) : i;
      }).filter(function (i) { return i.qty > 0; });
      localStorage.setItem(K.ITEMS, JSON.stringify(items));
      this.emit();
    },

    // Debounced server sync, keyed per line item. Rapid clicks reschedule the
    // timer with the latest absolute quantity, so N clicks = 1 request.
    _syncTimers: {},
    queueSync(key, qty) {
      var self = this;
      if (this._syncTimers[key]) clearTimeout(this._syncTimers[key]);
      this._syncTimers[key] = setTimeout(function () {
        delete self._syncTimers[key];
        fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: key, quantity: qty })
        })
          .then(function () { return self.fetchCart(); }) // reconcile with server truth
          .catch(function () {});
      }, 250);
    },

    updateQty(key, qty) {
      this.setLocalQty(key, qty); // instant UI
      this.queueSync(key, qty);   // background sync
      return Promise.resolve(this.getItems());
    },

    removeItem(key) {
      return this.updateQty(key, 0);
    },

    // ── Events ─────────────────────────────────────────────────
    emit() {
      var count = this.getCount();
      document.dispatchEvent(new CustomEvent('rb-cart', {
        detail: { items: this.getItems(), count: count, subtotal: this.getSubtotal() }
      }));
    },

    /* fromAdd=true renders the "Added to bag" confirmation in the drawer header.
       Opening from the cart icon passes nothing, so it stays "Your Cart". */
    openDrawer(fromAdd) {
      document.dispatchEvent(new CustomEvent('rb-cart-open', {
        detail: { fromAdd: !!fromAdd }
      }));
    },

    // ── Init ───────────────────────────────────────────────────
    init() {
      var self = this;

      // Sync cart on load
      self.fetchCart();

      // Update all nav badges
      document.addEventListener('rb-cart', function (e) {
        var count = (e.detail && e.detail.count) ? e.detail.count : 0;
        document.querySelectorAll('[data-cart-badge]').forEach(function (el) {
          el.textContent = count;
          el.style.display = count > 0 ? '' : 'none';
        });
      });

      // Cart buttons open drawer
      document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-cart-open]');
        if (btn) { e.preventDefault(); self.openDrawer(); }
      });

      // Re-sync whenever an item is added (from product cards / PDP)
      document.addEventListener('rb-cart', function (e) {
        if (e.detail && e.detail._fromAdd) self.fetchCart();
      });

      // Intercept redesigned product-card "Add to Cart" forms. Without this
      // they do a NATIVE submit to /cart/add and navigate away (to the cart,
      // and onward to checkout depending on the cart-action setting). We add
      // via AJAX instead and open the drawer as the "added" notification.
      document.addEventListener('submit', function (e) {
        var form = e.target;
        if (!form.classList || !form.classList.contains('rb-product-card__form')) return;
        e.preventDefault();
        var btn = form.querySelector('[type="submit"]');
        if (btn && btn.disabled) return;

        /* Multi-variant product: don't guess. Open the variant sheet and let the
           shopper choose — the sheet performs the add itself. Without this the
           card silently added whichever variant Liquid picked. */
        if (btn && btn.dataset.rbVariants) {
          var parsed = null;
          try { parsed = JSON.parse(btn.dataset.rbVariants); } catch (err) { parsed = null; }
          if (parsed && parsed.length > 1) {
            document.dispatchEvent(new CustomEvent('rb-variant-sheet-open', {
              detail: {
                variants:   parsed,
                title:      btn.dataset.rbProductTitle || '',
                img:        btn.dataset.rbProductImg || '',
                optionName: btn.dataset.rbOptionName || ''
              }
            }));
            return;
          }
          /* Malformed data — fall through and add the default variant rather
             than leaving the tap doing nothing. */
        }

        var origHTML = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.dataset.rbAdding = '1'; }

        /* Open the drawer IMMEDIATELY rather than after the round trip.
           Previously this awaited /cart/add.js then /cart.js before showing
           anything — measured at ~900ms on broadband, and multiples of that on
           mobile data. To the shopper the tap appeared to do nothing, then the
           drawer appeared late. The drawer re-renders on the 'rb-cart' event
           that fetchCart emits, so it fills in as soon as the server confirms. */
        self.openDrawer(true);

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        })
          .then(function (r) {
            if (!r.ok) throw new Error('add failed: ' + r.status);
            return r.json();
          })
          .then(function () { return self.fetchCart(); })
          .then(function () {
            if (btn) { btn.innerHTML = origHTML; btn.disabled = false; delete btn.dataset.rbAdding; }
          })
          .catch(function () {
            /* Close the drawer we optimistically opened, then fall back to a
               native submit so the shopper still gets a working add. */
            if (typeof self.closeDrawer === 'function') self.closeDrawer();
            document.dispatchEvent(new CustomEvent('rb-cart-close'));
            if (btn) { btn.innerHTML = origHTML; btn.disabled = false; delete btn.dataset.rbAdding; }
            form.submit();
          });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.RBCart.init(); });
  } else {
    window.RBCart.init();
  }
})();
