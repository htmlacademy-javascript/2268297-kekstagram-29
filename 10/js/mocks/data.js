import { getRandomArrayElement, getRandomInteger } from './util.js';
const PICTURE_NUMBER = 25;
const DESCRIPTION = [
  'Здорово  на природе',
  'В тесноте, да не в обиде',
  'Друг в беде не бросит',
  'Веселимся до утра',
  'С милым рай и в шалаше',
  'Кайф',
  'Экстрим',
];
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENT_NUMBER_MAX = 30;
const COMMENT_PHRASE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const AVATAR_NUMBER = 6;
const NAMES = [
  'Мария',
  'Хуан',
  'Кончита',
  'Педро',
  'Хулио',
  'Хуанита',
  'Бонита',
];

//генерирует id
const getIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = getIdGenerator();
const generatePhotoId = getIdGenerator();

const addMessage = () =>
  Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENT_PHRASE)).join(' ');

//добавляет комментарий
const addComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_NUMBER)}.svg`,
  message: addMessage(),
  name: getRandomArrayElement(NAMES),
});
//добавляет фотографию
const addPhoto = () => {
  const id = generatePhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from({length: getRandomInteger(0, COMMENT_NUMBER_MAX)}, addComment,)
  };
};

//создает массив обЪектов
function getPhotos() {
  return Array.from({ length: PICTURE_NUMBER }, addPhoto);
}

export { getPhotos };
