/* Функция для проверки длины строки.
Объявляем функцию с двумя параметрами: строкой и максимальной длиной
Сравниваем длину строки с максимальной длиной
Возвращаем результат
*/

const testLengthString = (string, lenghtMax) => string.length <= lenghtMax;

testLengthString('проверяемая строка', 20);
testLengthString('проверяемая строка', 18);
testLengthString('проверяемая строка', 10);
