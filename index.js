const readline = require('readline');
const {
  listProduct,
  createProduct,
  changeProduct,
  removeProduct,
  getInput,
} = require('./service.js');

productList();

async function productList() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let input;
  const availableInputs = ['1', '2', '3', '4', '5'];
  do {
    console.log('1. Список товаров');
    console.log('2. Добавить новый товар');
    console.log('3. Изменить товар');
    console.log('4. Удалить товар');
    console.log('5. Выход');

    input = await getInput(rl);
    while (!availableInputs.includes(input)) {
      console.log('Такой команды нет. Введите команду по списку');
      input = await getInput(rl);
    }

    switch (input) {
      case '1':
        listProduct();
        break;

      case '2':
        await createProduct(rl);
        break;

      case '3':
        await changeProduct(rl);
        break;

      case '4':
        await removeProduct(rl);
        break;
    }
  } while (input !== '6');
  rl.close();
}
