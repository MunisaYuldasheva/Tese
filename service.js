const fs = require('fs');
const file = 'data.json';

function readFile() {
  if (fs.existsSync(file)) {
    content = JSON.parse(fs.readFileSync(file));
  } else {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(file, '[]');
  }
  return content;
}

function listProduct() {
  const product = readFile();
  product.forEach((data) => console.log(`${data.id}. ${data.product}`));
  console.log('\n');
}

async function createProduct(rl) {
  let content = readFile();
  let newProduct = {};
  let input;

  console.log('Введите номер товара:');
  input = await getInput(rl);
  newProduct.id = input;
  console.log('Введите продукт: ');
  input = await getInput(rl);
  newProduct.product = input;
  content.push(newProduct);

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар добавлен', content, '\n');
}

async function changeProduct(rl) {
  let content = readFile();
  console.log('Введите номер продукта для изменения');
  input = await getInput(rl);
  const findIndex = content.findIndex((data) => data.id == input);
  const updateProduct = content[findIndex];
  if (findIndex === -1) {
    console.log('', '\n');
    return;
  } else {
    console.log('Введите название продукта, на которое хотите изменить');
  }
  input = await getInput(rl);
  updateProduct.product = input;

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар изменен', content, '\n');
}

async function removeProduct(rl) {
  let content = readFile();

  console.log('Введите номер продукта, который хотите удалить');
  input = await getInput(rl);
  const findIndex = content.findIndex((data) => data.id == input);
  if (findIndex === -1) {
    console.log('Такой команды нет, мы придумаем её позже, а пока выберите команду 1-5', '\n');
    return;
  } else {
    console.log(
      'Вы действительно хотите удалить этот продукт - ',
      content[findIndex],
      '\n',
      'Введите "да" или "нет"'
    );
  }
  input = await getInput(rl);
  if (input.toLowerCase() == 'да') {
    content.splice(findIndex, 1);
  } else {
    console.log('Товар не был удален', '\n');
  }

  let jsonContent = JSON.stringify(content, null, 2);
  fs.writeFileSync(file, jsonContent);

  console.log('Товар удален', content, '\n');
}

function getInput(rl) {
  return new Promise((resolve) => {
    rl.question('> ', (input) => resolve(input));
  });
}

module.exports = {
  listProduct,
  createProduct,
  changeProduct,
  removeProduct,
  getInput,
};
