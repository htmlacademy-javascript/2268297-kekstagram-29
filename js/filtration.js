import { clearThumbnails } from "./thumbnails.js";

const COUNT_RANDOM_PICTURES = 10;
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

const getRandomFilteredPicture = () => Math.random() - 0.5;
const getDiscussedFilteredPicture = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(getRandomFilteredPicture).slice(0, COUNT_RANDOM_PICTURES);
    case Filter.DISCUSSED:
      return [...pictures].sort(getDiscussedFilteredPicture);
    case Filter.DEFAULT:
      return [...pictures];
  }
};

const onFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    clearThumbnails();
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      const clickButton = evt.target;
      filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickButton.classList.add('img-filters__button--active');
      currentFilter = clickButton.id;
      callback(getFilteredPictures());
    }
  });
};

const renderFilteredPictures = (picturesData, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
  onFilterClick(callback);
};

export { renderFilteredPictures };

