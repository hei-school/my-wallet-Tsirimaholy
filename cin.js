function isFull(wallet) {
    return wallet.cinEntry.maxCapacity === wallet.cinEntry.list.length
}


function add(wallet, cin) {
    if (!isFull(wallet))
        return {...wallet.cinEntry, list: [...wallet.cinEntry.list, cin]}
    console.log("The cin entry is Full")
}

function remove(wallet, index) {
    let list = [...wallet.cinEntry.list];
    list.splice(index,1);
    return list;
}

exports.remove = remove
exports.add = add