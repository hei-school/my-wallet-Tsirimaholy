function addIncome(wallet, amount) {
    return wallet.moneyEntry.balance + amount
}

function subtractExpense(wallet, amount) {
    if (amount > wallet.moneyEntry.balance) {
        throw new Error('Insufficient funds');
    }
    return wallet.moneyEntry.balance - amount;
}

function flush(wallet) {
    return {...wallet.moneyEntry, balance: 0, transactions: 0};
}

exports.flush = flush
exports.subtractExpense = subtractExpense;
exports.addIncome = addIncome