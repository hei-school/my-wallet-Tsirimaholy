function isFull(wallet) {
    return wallet.cinEntry.maxCapacity === wallet.cinEntry.list.length
}


function add(wallet, cin) {
    if (!isFull(wallet))
        return {...wallet.cinEntry, list: [...wallet.cinEntry.list, cin]}
    console.log("The cin entry is Full")
}

function remove(wallet, cin) {
    let list = [...wallet.cinEntry.list];
    return list.filter(currentCin => currentCin.id !== cin.id);
}

exports.remove = remove
exports.add = add