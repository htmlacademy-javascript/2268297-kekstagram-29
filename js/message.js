import { isEscapeKey } from './util.js';
import { onModalWindowEscape } from './upload-picture.js';
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');

const onMessageEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onBodyClick = (evt) => {
  if (evt.target === document.querySelector('.error, .success')) {
    evt.preventDefault();
    closeMessage();
  }
};

const onButtonClick = (evt) => {
  if (evt.target === document.querySelector('.error__button, .success__button')) {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  const messageElement = document.querySelector('.error, .success');
  messageElement.remove();
  document.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onMessageEscape);
  document.addEventListener('keydown', onModalWindowEscape);
}

const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscape);
  messageElement.querySelector(closeButtonClass).addEventListener('click', onButtonClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
  document.removeEventListener('keydown', onModalWindowEscape);
};

export { showSuccessMessage, showErrorMessage };
