import { openBigPicture } from './big-pictures.js';
import { renderThumbnails } from './thumbnails.js';
const containerElement = document.querySelector('.pictures');
let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }
  evt.preventDefault();
  const picture = pictures.find(
    (itemPictures) => itemPictures.id === +thumbnail.dataset.thumbnailId
  );
  openBigPicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures, containerElement);
  containerElement.addEventListener('click', onContainerClick);
};

export { renderGallery };

