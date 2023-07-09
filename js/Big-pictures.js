import { isEscapeKey } from './util.js';
import { renderThumbnails } from './thumbnails.js';

const modalWindow = document.querySelector('.big_picture');
const modalWindowOpenElement = document.querySelector('.pictures');
const modalWindowCloseElement = document.querySelector('.big-picture__cancel');

const onModalWindowEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

function openModalWindow () {
  modalWindow.classList.remove('hidden');
  document.addEventListener('keydown', onModalWindowEscape);
  bodyElement.classList.add('modal-open');
};

function closeModalWindow () {
  modalWindow.classList.add('hidden');
  document.addEventListener('keydown', onModalWindowEscape);
  bodyElement.classList.remove('modal-open');
};

modalWindowOpenElement.addEventListener('click', () => {
  openModalWindow();
});

modalWindowCloseElement.addEventListener('click', () => {
  closeModalWindow();
});
