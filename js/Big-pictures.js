import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big_picture');
const bodyElement = document.querySelector('body');
const modalWindowCloseElement = document.querySelector('.big-picture__cancel');

const closeModalWindow = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
};

const onModalWindowEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};


const renderPictureInformation = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalWindowEscape);
  bodyElement.classList.add('modal-open');
  renderPictureInformation(data);
};

modalWindowCloseElement.addEventListener('click', () => {
  closeModalWindow();
});

export { openBigPicture };
