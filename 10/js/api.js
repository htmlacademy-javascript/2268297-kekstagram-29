const DATA_URL = 'https://29.javascript.pages.academy/kekstagram';
const routeData = {
  GET_DATA: '/data',
  POST_DATA: '/',
};
const methodData = {
  GET: 'GET',
  POST: 'POST',
};

const errorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Обновите страницу',
  POST_DATA: 'Не удалось отпраить данныею Попробуйте еще раз',
};

const createLoader = (route, method, errorText, body = null) =>
  fetch(`${DATA_URL}${route}`,{ method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => createLoader(routeData.GET_DATA, methodData.GET, errorMessage.GET_DATA);
const postData = (body) => createLoader(routeData.POST_DATA, methodData.POST, errorMessage.POST_DATA, body);

export { getData, postData };
