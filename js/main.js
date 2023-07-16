import { getPhotos } from './mocks/data.js';
import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
const pictureData = getPhotos();
renderThumbnails(pictureData);
renderGallery(pictureData);
