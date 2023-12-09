const readline = require('readline');
const {addIncome, subtractExpense, flush: flushMoney} =  require("./money")

const wallet = {
  balance: 0,
  transactions: [],
  history: [],
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function doAddIncome(amount) {
  wallet.balance = addIncome(wallet, amount)
  wallet.transactions.push({ type: 'income', amount });
  wallet.history.push({ action: 'Added income', amount });
  console.log(`Added ${amount} to your wallet. New balance: ${wallet.balance}`);
}

function doSubtractExpense(amount) {
  wallet.balance = subtractExpense(wallet, amount);
  wallet.transactions.push({ type: 'expense', amount });
  wallet.history.push({ action: 'Subtracted expense', amount });
  console.log(`Subtracted ${amount} from your wallet. New balance: ${wallet.balance}`);
}

function viewBalance() {
  console.log(`Current balance: ${wallet.balance}`);
  console.table(wallet.transactions);
}

function viewHistory() {
  console.log('--- History ---');
  for (const entry of wallet.history) {
    console.log(`${entry.action}: ${entry.amount}`);
  }
  console.log('');
}

function flushWallet() {
  console.log('Are you sure you want to flush your wallet? This will remove all transactions and history.');
  rl.question('(y/n): ', (answer) => {
    if (answer === 'y') {
      const {transactions,balance} = flushMoney(wallet)
      wallet.transactions = transactions;
      wallet.balance = balance
      console.log('Wallet flushed successfully.');
    } else {
      console.log('Flushing canceled.');
    }
    mainMenu();
  });
}

function exit() {
  console.log('Exiting the application.');
  rl.close();
}

function mainMenu() {
  console.log('Welcome to your Wallet Manager!');
  console.log('1. Add Income');
  console.log('2. Subtract Expense');
  console.log('3. View Balance');
  console.log('4. View History');
  console.log('5. Flush Wallet');
  console.log('6. Exit');

  rl.question('Enter your choice: ', (option) => {
    switch (option) {
      case '1':
        rl.question('Enter income amount: ', (income) => {
          doAddIncome(parseFloat(income));
          mainMenu();
        });
        break;
      case '2':
        rl.question('Enter expense amount: ', (expense) => {
          doSubtractExpense(parseFloat(expense));
          mainMenu();
        });
        break;
      case '3':
        viewBalance();
        mainMenu();
        break;
      case '4':
        viewHistory();
        mainMenu();
        break;
      case '5':
        flushWallet();
        break;
      case '6':
        exit();
        break;
      default:
        console.log('Invalid option.');
        mainMenu();
        break;
    }
  });
}

mainMenu();

rl.on('close', () => {
  process.exit(0);
});
