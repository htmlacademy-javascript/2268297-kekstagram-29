import { getData, postData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './gallery.js';
import { uploadPicture, setOnFormSubmit, closeEditorPicture } from './upload-picture.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
uploadPicture();

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
  renderThumbnails(pictureData);
  renderGallery(pictureData);
} catch (error) {
  showAlert(error.message);
}
