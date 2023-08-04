import { isEscapeKey } from './util.js';
import { resetScale, addButtonScaleHandler } from './scale.js';
import { addSliderEffectHandler, hideSlider, resetEffect} from './slider-effects.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const pictureFieldElement = formElement.querySelector('.img-upload__input');
const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentsFieldElement = formElement.querySelector('.text__description');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const pictureEffectsPreviewElement = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openEditorPicture = () => {
  overlayElement.classList.remove('hidden');
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

pristine.addValidator(hashtagsFieldElement, validateHashtagCount, 'не больше 5', 3, true);
pristine.addValidator(hashtagsFieldElement, validateHashtag, 'Невалидный хэш-тэг', 2, true);
pristine.addValidator(hashtagsFieldElement, validateUniqueHashtagName, 'Повторяющийся хэш-тэг', 1, true);


const closeEditorPicture = () => {
  formElement.reset();
  overlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
  pristine.reset();
  resetScale();
  resetEffect();
};

const isFieldFocus = () => document.activeElement === hashtagsFieldElement || document.activeElement === commentsFieldElement;

function onModalWindowEscape(evt) {
  if (isEscapeKey(evt) && !isFieldFocus()) {
    evt.preventDefault();
    closeEditorPicture();
  }
}

cancelButtonElement.addEventListener('click', () => {
  closeEditorPicture();
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Идет загрузка';
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const showUploadPicture = () => {
  const file = pictureFieldElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    picturePreviewElement.src = URL.createObjectURL(file);
    pictureEffectsPreviewElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreviewElement.src}')`;
    });
  }
};

pictureFieldElement.addEventListener('change', () => {
  openEditorPicture();
  showUploadPicture();
});

const setOnFormSubmit = (callback) => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(formElement));
      unBlockSubmitButton();
    }
  });
};

export { setOnFormSubmit, closeEditorPicture, onModalWindowEscape};
