import { getData, postData } from './api.js';
import { renderThumbnails, clearThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import { setOnFormSubmit, closeEditorPicture } from './upload-picture.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { renderFilteredPictures } from './filtration.js';
import { debounce } from './util.js';

setOnFormSubmit(async (data) => {
  try {
    await postData(data);
    closeEditorPicture();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const pictureData = await getData();
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  renderThumbnails(pictureData);
  renderGallery(pictureData);
  renderFilteredPictures(pictureData, debouncedRenderThumbnails);
} catch (error) {
  showAlert(error.message);
}
