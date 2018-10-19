var siteMenu = document.querySelector(".site-menu");
var toggleButton = document.querySelector(".toggle-button");
console.log(siteMenu);
siteMenu.classList.add('visual-hidden');
toggleButton.classList.add('toggle-button--open');
isOpen = false;

var menuOpen = function() {
  if (isOpen) {
    siteMenu.classList.add('visual-hidden');
    toggleButton.classList.remove('toggle-button--close');
    toggleButton.classList.add('toggle-button--open');
    isOpen = false;
  } else {
    siteMenu.classList.remove('visual-hidden');
    toggleButton.classList.remove('toggle-button--open');
    toggleButton.classList.add('toggle-button--close');
    isOpen = true;
  }
}
