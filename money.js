function addIncome(wallet, amount) {
    return wallet.moneyEntry.balance + amount
}

function subtractExpense(wallet, amount) {
    if (amount > wallet.balance) {
        console.log('Insufficient funds');
        return;
    }
    return wallet.moneyEntry.balance - amount;
}

function flush(wallet) {
    return {...wallet.moneyEntry, balance: 0, transactions: 0};
}

exports.flush = flush
exports.subtractExpense = subtractExpense;
exports.addIncome = addIncome