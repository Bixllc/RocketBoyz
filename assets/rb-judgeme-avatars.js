(function () {
  function addAvatars(root) {
    var wrappers = root.querySelectorAll('.jdgm-carousel-item__reviewer-name-wrapper:not([data-rb-avatar-done])');
    wrappers.forEach(function (wrapper) {
      wrapper.setAttribute('data-rb-avatar-done', 'true');
      var nameEl = wrapper.querySelector('.jdgm-carousel-item__reviewer-name');
      var name = nameEl ? nameEl.textContent.trim() : '';
      if (!name) return;

      var initial = name.charAt(0).toUpperCase();
      var avatar = document.createElement('div');
      avatar.className = 'rb-jdgm-avatar';
      avatar.textContent = initial;
      wrapper.insertBefore(avatar, wrapper.firstChild);
    });
  }

  function observe() {
    var containers = document.querySelectorAll('.jdgm-carousel-wrapper, .jdgm-widget.jdgm-carousel');
    if (!containers.length) return false;

    containers.forEach(function (container) {
      addAvatars(container);
      var observer = new MutationObserver(function () { addAvatars(container); });
      observer.observe(container, { childList: true, subtree: true });
    });
    return true;
  }

  if (!observe()) {
    var tries = 0;
    var interval = setInterval(function () {
      tries++;
      if (observe() || tries > 40) clearInterval(interval);
    }, 500);
  }
})();
