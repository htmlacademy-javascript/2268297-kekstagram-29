import { openBigPicture } from './big-pictures.js';
const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (itemPictures) => itemPictures.id === +thumbnail.dataset.thumbnailId
    );
    openBigPicture(picture);
  });
};

export { renderGallery };

