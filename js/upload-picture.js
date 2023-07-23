import { isEscapeKey } from './util.js';
import { resetScale, addButtonScaleHandler } from './scale.js';
import { addSliderEffectHandler, hideSlider, resetEffect} from './slider-effects.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1-19}$/i;
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const pictureField = form.querySelector('.img-upload__input');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openEditorPicture = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalWindowEscape);
  addButtonScaleHandler();
  addSliderEffectHandler();
  hideSlider();
};

const editHashtag = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateHashtag = (value) => editHashtag(value).every((hashtag) => (hashtag.match(VALID_SYMBOLS)));
const validateHashtagCount = (value) => editHashtag(value).length <= MAX_HASHTAGS_COUNT;
const validateUniqueHashtagName = (value) => {
  const UpperCaseHashtag = editHashtag(value).map((hashtag) => hashtag.toUpperCase());
  return UpperCaseHashtag.length === new Set(UpperCaseHashtag).size;
};

pristine.addValidator(hashtagsField, validateHashtagCount, 'не больше 5', 3, true);
pristine.addValidator(hashtagsField, validateHashtag, 'Невалидный хэш-тэг', 2, true);
pristine.addValidator(hashtagsField, validateUniqueHashtagName, 'Повторяющийся хэш-тэг', 1, true);


const closeEditorPicture = () => {
  form.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
  pristine.reset();
  resetScale();
  resetEffect();
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет загрузка';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unBlockSubmitButton();
    }
  });
};

export { setOnFormSubmit, uploadPicture, closeEditorPicture};
