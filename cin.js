function isFull(wallet) {
    return wallet.cinEntry.maxCapacity === wallet.cinEntry.list.length
}


function add(wallet, cin) {
    if (!isFull(wallet))
        return {...wallet.cinEntry, list: [...wallet.cinEntry.list, cin]};
    return wallet;
}

function remove(wallet, index) {
    let list = [...wallet.cinEntry.list];
    if (index < 0 || index >= list.length) {
        throw new RangeError("The index should be between 0 and list.length(0<=index<length)")
    }
    list.splice(index, 1);
    return list;
}

exports.remove = remove
exports.add = add