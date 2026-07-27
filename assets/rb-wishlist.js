/**
 * RocketBoyz Wishlist — localStorage-backed favorites
 * Storage: localStorage key `rb_wishlist`, a JSON array of product handles.
 * Event: dispatches `rb:wishlist:change` on document whenever the list changes,
 * with detail: { handle, added, wishlist }
 */
(function () {
  if (window.__rbWishlistInit) return;
  window.__rbWishlistInit = true;

  var STORAGE_KEY = 'rb_wishlist';
  var MAX_ITEMS = 20;

  function getWishlist() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function setWishlist(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* localStorage unavailable (private mode, quota, etc.) — fail silently */
    }
  }

  function isWished(handle) {
    return getWishlist().indexOf(handle) !== -1;
  }

  function toggleWishlist(handle) {
    var list = getWishlist();
    var idx = list.indexOf(handle);
    var added;
    if (idx === -1) {
      if (list.length >= MAX_ITEMS) {
        document.dispatchEvent(
          new CustomEvent('rb:wishlist:limit', { detail: { max: MAX_ITEMS } })
        );
        return null;
      }
      list.push(handle);
      added = true;
    } else {
      list.splice(idx, 1);
      added = false;
    }
    setWishlist(list);
    document.dispatchEvent(
      new CustomEvent('rb:wishlist:change', {
        detail: { handle: handle, added: added, wishlist: list }
      })
    );
    return added;
  }

  function syncButtonStates() {
    var list = getWishlist();

    document.querySelectorAll('.rb-btn-wish[data-product-handle]').forEach(function (btn) {
      var handle = btn.getAttribute('data-product-handle');
      var wished = handle ? list.indexOf(handle) !== -1 : false;
      btn.classList.toggle('is-wished', wished);
      btn.setAttribute('aria-pressed', wished ? 'true' : 'false');
    });

    // Nav heart icon lights up whenever there's at least one saved item
    document.querySelectorAll('.rb-btn-wish-nav').forEach(function (btn) {
      btn.classList.toggle('is-wished', list.length > 0);
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.rb-btn-wish');
    if (!btn) return;

    var handle = btn.getAttribute('data-product-handle');
    if (handle) {
      e.preventDefault();
      toggleWishlist(handle);
    } else {
      // Legacy safety net: button has no product data, just flip the class visually.
      btn.classList.toggle('is-wished');
    }
  });

  document.addEventListener('rb:wishlist:change', syncButtonStates);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncButtonStates);
  } else {
    syncButtonStates();
  }

  // Small public API so other scripts (e.g. the favorites page) can reuse this store.
  window.RBWishlist = {
    STORAGE_KEY: STORAGE_KEY,
    MAX_ITEMS: MAX_ITEMS,
    get: getWishlist,
    isWished: isWished,
    toggle: toggleWishlist,
    sync: syncButtonStates
  };
})();
