/**
 * Проверка длины строки
 * @param {string} string - исходная строка
 * @param {int} lengthMax - длина строки для проверки
 * @return {boolean} - истина, если строка меньше либо равна длине
*/
const checkLengthString = (string, lenghtMax) => string.length <= lenghtMax;
checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);
/**
 * Проверка Палиндрома
 * @param {string} string - исходная строка
 * @return {boolean} true - если исходная строка равна перевевернутой строке
 */
const checkPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  let newString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }
  return newString === normalizedString;
};
checkPalindrome('Лёша на полке клопа нашёл ');
