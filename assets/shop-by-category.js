(function () {
  function setupCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-shop-cat-slide]'));
    var prevBtn = root.querySelector('[data-shop-cat-prev]');
    var nextBtn = root.querySelector('[data-shop-cat-next]');
    var index = slides.findIndex(function (slide) {
      return slide.classList.contains('is-active');
    });
    if (index < 0) index = 0;

    function goTo(newIndex) {
      var total = slides.length;
      if (total === 0) return;
      var next = ((newIndex % total) + total) % total;
      if (next === index) return;
      slides[index].classList.remove('is-active');
      index = next;
      slides[index].classList.add('is-active');
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(index + 1);
      });
    }

    var track = root.querySelector('[data-shop-cat-track]') || root;
    var touchStartX = null;

    track.addEventListener(
      'touchstart',
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    track.addEventListener(
      'touchend',
      function (e) {
        if (touchStartX === null) return;
        var touchEndX = e.changedTouches[0].screenX;
        var delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 40) {
          if (delta < 0) {
            goTo(index + 1);
          } else {
            goTo(index - 1);
          }
        }
        touchStartX = null;
      },
      { passive: true }
    );
  }

  function init() {
    var carousels = document.querySelectorAll('[data-shop-cat-carousel]');
    carousels.forEach(setupCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
