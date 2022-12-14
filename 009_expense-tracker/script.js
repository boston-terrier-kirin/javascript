const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: +150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions = [];
if (localStorageTransactions) {
  transactions = localStorageTransactions;
}

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value === '') {
    alert('Pleaes add a text and amount');
    return;
  }

  const transaction = {
    id: generateId(),
    text: text.value,
    amount: +amount.value,
  };
  transactions.push(transaction);

  addTransactionDom(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function addTransactionDom(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(sign === '-' ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((tx) => tx.amount);

  const total = amounts
    .reduce((acc, value) => {
      return (acc += value);
    }, 0)
    .toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, value) => {
      return (acc += value);
    }, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter((item) => item < 0)
      .reduce((acc, value) => {
        return (acc += value);
      }, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  console.log(transactions, id);
  transactions = transactions.filter((tx) => tx.id !== id);
  console.log(transactions, id);

  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach((tx) => addTransactionDom(tx));

  updateValues();
}

form.addEventListener('submit', addTransaction);

init();
