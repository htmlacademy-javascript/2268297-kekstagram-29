import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big_picture');
const bodyElement = document.querySelector('body');
const modalWindowCloseElement = document.querySelector('.big-picture__cancel');

const closeModalWindow = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
};

function onModalWindowEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

const renderPictureInformation = ({ url, likes, description }) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigPicture = (dataPicture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalWindowEscape);
  bodyElement.classList.add('modal-open');
  renderPictureInformation(dataPicture);
};

modalWindowCloseElement.addEventListener('click', () => {
  closeModalWindow();
});

export { openBigPicture };
