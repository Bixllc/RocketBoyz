(function () {
  if (window.__rbWishlistInit) return;
  window.__rbWishlistInit = true;

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.rb-btn-wish, .rb-btn-wish-nav');
    if (!btn) return;
    btn.classList.toggle('is-wished');
  });
})();
