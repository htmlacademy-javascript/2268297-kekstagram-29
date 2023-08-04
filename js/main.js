import { getData, postData } from './api.js';
import { renderGallery } from './gallery.js';
import { setOnFormSubmit, closeEditorPicture } from './upload-picture.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { renderFilteredPictures, getFilteredPictures } from './filtration.js';
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
  const debouncedRenderGallery = debounce(renderGallery);
  renderFilteredPictures(pictureData, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (error) {
  showAlert(error.message);
}
