const readline = require('readline');
const {addIncome, subtractExpense, flush: flushMoney} = require("./money")
const cinAction = require("./cin")
const wallet = {
    history: [],
    moneyEntry: {
        balance: 0,
        transactions: [],
    },
    cinEntry: {
        list: [],
        maxCapacity: 2,
    },
    bankCardEntry: {
        list: []
    },
    drivingLicenceEntry: {
        list: []
    },
    visitCard: {
        list: []
    },
    idPhoto: {
        list: []
    }
};


const IReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const promptMe = (promptQuery) => {
    let answer;
    IReadLine.question(promptQuery, (receivedInput) => {
        answer = receivedInput;
    })
    return answer;
}

function doInsertCin() {
    const cinInfos = {
        owner: '',
        number: '',
        label: 'default'
    }

    console.log("Enter the following infos:");
    cinInfos.owner = promptMe('[1]: First name and Last name of the owner: ');
    cinInfos.number = promptMe('[2]: Cin number');
    cinInfos.label = promptMe('[2]: Label (Optional)');

    cinAction.add(wallet, cinInfos);
    wallet.history.push({"type": "add cin", label: cinInfos.owner})
}

function listCin() {
    console.table(wallet.cinEntry.list);
}

function doRemoveCin() {
    console.log("Choose which one do you wanna remove by his index")
    console.table(wallet.cinEntry.list);
    let cinIndex = promptMe("The cin index");
    const toRemove = wallet.cinEntry.list[cinIndex];

    wallet.cinEntry.list = cinAction.remove(wallet, cinIndex);
    wallet.history.push({type: "Removed cin", label: toRemove.owner})
}

function doAddIncome(amount) {
    const moneyEntry = wallet.moneyEntry
    moneyEntry.balance = addIncome(wallet, amount)
    moneyEntry.transactions.push({type: 'income', amount});

    wallet.history.push({action: 'Added income', amount});
    console.log(`Added ${amount} to your wallet. New balance: ${moneyEntry.balance}`);
}

function doSubtractExpense(amount) {
    const moneyEntry = wallet.moneyEntry
    moneyEntry.balance = subtractExpense(wallet, amount);
    moneyEntry.transactions.push({type: 'expense', amount});
    wallet.history.push({action: 'Subtracted expense', amount});
    console.log(`Subtracted ${amount} from your wallet. New balance: ${moneyEntry.balance}`);
}

function viewBalance() {
    const moneyEntry = wallet.moneyEntry;
    console.log(`Current balance: ${moneyEntry.balance}`);
    console.table(moneyEntry.transactions);
}

function viewHistory() {
    console.log('--- History ---');
    for (const entry of wallet.history) {
        console.log(`${entry.action}: ${entry.amount}`);
    }
    console.log('');
}

function flushWallet() {
    const moneyEntry = wallet.moneyEntry;
    console.log('Are you sure you want to flush your wallet? This will remove all transactions and history.');
    IReadLine.question('(y/n): ', (answer) => {
        if (answer === 'y') {
            const {transactions, balance} = flushMoney(wallet)
            moneyEntry.transactions = transactions;
            moneyEntry.balance = balance
            console.log('Wallet flushed successfully.');
        } else {
            console.log('Flushing canceled.');
        }
        moneySubMenu();
    });
}

function exit() {
    console.log('Exiting the application.');
    IReadLine.close();
}

function moneySubMenu() {
    console.log('Welcome to your Wallet Manager!');
    console.log('1. Add Income');
    console.log('2. Subtract Expense');
    console.log('3. View Balance');
    console.log('4. View History');
    console.log('5. Flush Wallet');
    console.log('6. Exit');

    IReadLine.question('Enter your choice: ', (option) => {
        switch (option) {
            case '1':
                IReadLine.question('Enter income amount: ', (income) => {
                    doAddIncome(parseFloat(income));
                    moneySubMenu();
                });
                break;
            case '2':
                IReadLine.question('Enter expense amount: ', (expense) => {
                    doSubtractExpense(parseFloat(expense));
                    moneySubMenu();
                });
                break;
            case '3':
                viewBalance();
                moneySubMenu();
                break;
            case '4':
                viewHistory();
                moneySubMenu();
                break;
            case '5':
                flushWallet();
                break;
            case '6':
                exit();
                break;
            default:
                console.log('Invalid option.');
                moneySubMenu();
                break;
        }
    });
}

moneySubMenu();

IReadLine.on('close', () => {
    process.exit(0);
});
