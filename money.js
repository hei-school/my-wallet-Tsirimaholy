function addIncome(wallet, amount) {
    return wallet.balance + amount
}

function subtractExpense(wallet, amount) {
    if (amount > wallet.balance) {
        console.log('Insufficient funds');
        return;
    }
    return wallet.balance - amount;
}

function flush(wallet) {
    return {...wallet, balance: 0, transactions: []}
}

exports.flush = flush
exports.subtractExpense = subtractExpense;
exports.addIncome = addIncome