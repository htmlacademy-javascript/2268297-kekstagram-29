const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export { renderThumbnails };

const modalWindow = document.querySelector('body');
const bigPicture = document.querySelector('.big_picture');
const bigPictureOpen = document.querySelector('.picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

bigPictureOpen.addEventListener('click', (evt) => {
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  modalWindow.classList.add('modal-open');
});

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  modalWindow.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    modalWindow.classList.remove('modal-open');
  }
});
