import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const pictureField = document.querySelector('.img-upload__input');
const hashtagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description')
const cancelButton = document.querySelector('.img-upload__cancel');

const openEditorPicture = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalWindowEscape)
};

const closeEditorPicture = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape)
};

const isFieldFocus = () => document.activeElement === hashtagsField || document.activeElement === commentsField;

function onModalWindowEscape(evt) {
  if (isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    closeEditorPicture();
  }
}


cancelButton.addEventListener('click', () => {
  closeEditorPicture();
});

const uploadPicture = () => {
  pictureField.addEventListener('change', openEditorPicture);
};

export { uploadPicture };
