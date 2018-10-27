var siteMenu = document.querySelector('.site-menu');
var toggleButton = document.querySelector('.toggle-button');
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

var modal = document.querySelector('.modal');
var isModalOpen = false;

var openBasketModal = function() {
  console.log("open");
  if (isModalOpen) {
    modal.classList.add('none');
    isModalOpen = false;
  } else {
    modal.classList.remove('none');
    isModalOpen = true;
  }
}
