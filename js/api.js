const DATA_URL = 'https://29.javascript.pages.academy/kekstagram';
const RouteData = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const MethodData = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
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

const getData = () => createLoader(RouteData.GET_DATA, MethodData.GET, ErrorMessage.GET_DATA);
const postData = (body) => createLoader(RouteData.POST_DATA, MethodData.POST, ErrorMessage.POST_DATA, body);

export { getData, postData };
