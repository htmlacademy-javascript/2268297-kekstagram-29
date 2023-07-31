import { isEscapeKey } from './util.js';
const COUNT_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const modalWindowCloseElement = document.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const commentCountElement = document.querySelector('.social__comment-count');
let commentsShown = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  const commentImg = comment.querySelector('.social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = (comments) => {
  commentsShown += COUNT_COMMENTS_TO_SHOW;
  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentCountElement.textContent = `${commentsShown} из ${comments.length} комментариев`;
};

const closeModalWindow = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscape);
  commentsShown = 0;
};

function onModalWindowEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

const renderPictureInformation = ({ url, likes, description }) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigPicture = (dataPicture) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalWindowEscape);
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.addEventListener('click', () => {
    renderComments(dataPicture.comments);
  });
  renderPictureInformation(dataPicture);
  renderComments(dataPicture.comments);
};

modalWindowCloseElement.addEventListener('click', () => {
  closeModalWindow();
});

export { openBigPicture };
