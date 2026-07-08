/**
 * RocketBoyz Cart Store — syncs Shopify cart API with localStorage
 * Events: dispatches 'rb-cart' on every change; listen for 'rb-cart-open' to open drawer
 */
(function () {
  'use strict';

  const K = { ITEMS: 'rb_cart_items', PROTECT: 'rb_protect', TERMS: 'rb_terms' };

  window.RBCart = {
    // ── Getters ────────────────────────────────────────────────
    getItems() {
      try { return JSON.parse(localStorage.getItem(K.ITEMS) || '[]'); } catch { return []; }
    },
    getProtect() {
      return localStorage.getItem(K.PROTECT) !== '0'; // default ON
    },
    getTerms() {
      return localStorage.getItem(K.TERMS) === '1';
    },
    getCount() {
      return this.getItems().reduce(function (s, i) { return s + i.qty; }, 0);
    },
    getSubtotal() {
      var base = this.getItems().reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      return base + (this.getProtect() ? 155 : 0);
    },

    // ── Setters ────────────────────────────────────────────────
    setProtect(v) {
      localStorage.setItem(K.PROTECT, v ? '1' : '0');
      this.emit();
    },
    setTerms(v) {
      localStorage.setItem(K.TERMS, v ? '1' : '0');
      this.emit();
    },

    // ── Shopify cart operations ────────────────────────────────
    async fetchCart() {
      try {
        var r = await fetch('/cart.js');
        var cart = await r.json();
        var items = cart.items.map(function (i) {
          return {
            key: i.key,
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

    async updateQty(key, qty) {
      try {
        await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: key, quantity: qty })
        });
      } catch (e) {}
      return this.fetchCart();
    },

    async removeItem(key) {
      return this.updateQty(key, 0);
    },

    // ── Events ─────────────────────────────────────────────────
    emit() {
      var count = this.getCount();
      document.dispatchEvent(new CustomEvent('rb-cart', {
        detail: { items: this.getItems(), count: count, subtotal: this.getSubtotal() }
      }));
    },

    openDrawer() {
      document.dispatchEvent(new CustomEvent('rb-cart-open'));
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
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.RBCart.init(); });
  } else {
    window.RBCart.init();
  }
})();
