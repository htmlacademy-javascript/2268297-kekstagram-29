const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const buttonMoreElement = document.querySelector('.scale__control--bigger');
const buttonLessElement = document.querySelector('.scale__control--smaller');
const scaleValueElement = document.querySelector('.scale__control--value');
const pictureElement = document.querySelector('.img-upload__preview img');

const scalePicture = (value) => {
  pictureElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const onButtonMoreClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  const enlargedScaleValue = currentScaleValue + SCALE_STEP;
  if (enlargedScaleValue > MAX_SCALE) {
    scalePicture(MAX_SCALE);
  } else {
    scalePicture(enlargedScaleValue);
  }
};

const onButtonLessClick = () => {
  const currentScaleValue = parseInt(scaleValueElement.value, 10);
  const reducedScaleValue = currentScaleValue - SCALE_STEP;
  if (reducedScaleValue < MIN_SCALE) {
    scalePicture(MIN_SCALE);
  } else {
    scalePicture(reducedScaleValue);
  }
};

const resetScale = () => scalePicture(DEFAULT_SCALE);

const initScale = () => {
  buttonMoreElement.addEventListener('click', onButtonMoreClick);
  buttonLessElement.addEventListener('click', onButtonLessClick);
};

export { resetScale, initScale };
