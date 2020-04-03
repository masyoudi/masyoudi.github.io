window.addEventListener('DOMContentLoaded', function() {
  qS('#toggle-menu').addEventListener('click', function() {
    qS('aside.page-sidebar').classList.toggle('show');
  });

  qS('#close-menu').addEventListener('click', function() {
    qS('aside.page-sidebar').classList.toggle('show');
  });

  function qS(el) {
    return document.querySelector('' + el);
  }
});
