import { getPhotos } from './mocks/data.js';
import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import { uploadPicture } from './upload-picture.js';
const pictureData = getPhotos();
renderThumbnails(pictureData);
renderGallery(pictureData);
uploadPicture();
