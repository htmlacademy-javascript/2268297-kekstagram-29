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
    default:
      return [...pictures];
  }
};

const onFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) {
      const clickButton = evt.target;
      filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickButton.classList.add('img-filters__button--active');
      currentFilter = clickButton.id;
      callback(getFilteredPictures());
    }
  });
};
document.removeEventListener('keydown', onFilterClick);

const renderFilteredPictures = (picturesData, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
  onFilterClick(callback);
};

export { renderFilteredPictures, getFilteredPictures};

