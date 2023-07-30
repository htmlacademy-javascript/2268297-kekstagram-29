import { isEscapeKey } from './util.js';
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');


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

function closeMessage () {
  const messageElement = document.querySelector('.error, .success');
  messageElement.remove();
  document.addEventListener('keydown', onMessageEscape);
  document.removeEventListener('click', onBodyClick);
}

const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscape);
  messageElement.querySelector(closeButtonClass).addEventListener('click', closeMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
