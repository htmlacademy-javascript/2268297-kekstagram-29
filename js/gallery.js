import { openBigPicture } from './Big-pictures.js';
import { renderThumbnails } from './thumbnails.js';
const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openBigPicture(picture);
  });

  renderThumbnails(pictures. container);
};

export { renderGallery };

