import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const pictureField = document.querySelector('.img-upload__input');
const hashtagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');


const openEditorPicture = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalWindowEscape)
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1-19}$/i;
const hashtags = hashtagsField.value.split(' ');
const validateHashtag = () => hashtags.every((hashtag) => VALID_SYMBOLS.test(hashtag));
const validateHashtagCount = () => hashtags.length <= MAX_HASHTAGS_COUNT;

const validateUniqueHashtagName = () => {
  const UpperCaseHashtag = hashtags.map((hashtag) => hashtag.toUpperCase());
  return UpperCaseHashtag.length === new Set(UpperCaseHashtag).size;
};

pristine.addValidator(hashtagsField, validateHashtagCount, 'не больше 5');
pristine.addValidator(hashtagsField, validateHashtag, 'Невалидный хэш-тэг');
pristine.addValidator(hashtagsField, validateUniqueHashtagName, 'Повторяющийся хэш-тэг');


const closeEditorPicture = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
  pristine.reset();
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
