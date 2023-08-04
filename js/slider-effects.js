const filters = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
  none: {
    name: 'none',
  },
};

const sliderElement = document.querySelector('.effect-level__slider');
const valueEffectElement = document.querySelector('.effect-level__value');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectsElement = document.querySelector('.effects__list');
const picturePreviewElement = document.querySelector('.img-upload__preview img');

const changeSliderEffect = (effect, value, unit) => {
  valueEffectElement.value = value;
  picturePreviewElement.style.filter = `${effect}(${value}${unit})`;
};

const createSliderEffect = (effects) => {
  const {min, max, step} = effects;
  noUiSlider.create(sliderElement, {
    range: {min, max},
    start: max,
    step: step,
    connect: 'lower'
  });
  sliderElement.noUiSlider.on('update', () => {
    valueEffectElement.value = sliderElement.noUiSlider.get();
    changeSliderEffect(effects.name, valueEffectElement.value, effects.unit);
  });
};

const showSliderEffect = (effects) => {
  sliderContainerElement.classList.remove('hidden');
  createSliderEffect(effects);
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const resetEffect = () => {
  hideSlider();
  valueEffectElement.value = null;
  picturePreviewElement.style.filter = null;
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const onChangeEffect = (evt) => {
  resetEffect();
  const effects = filters[evt.target.value];
  if (effects.name === 'none') {
    picturePreviewElement.removeAttribute ('style');
    return;
  }
  showSliderEffect(effects);
};

const addSliderEffectHandler = () => {
  effectsElement.addEventListener('change', onChangeEffect);
};

export { addSliderEffectHandler, hideSlider, resetEffect };
