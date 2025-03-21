function sortString(arr, key) {
    return arr.sort((a, b) => {
        const valueA = a[key].replace(/\s+/g, '');
        const valueB = b[key].replace(/\s+/g, '');
        return valueA.localeCompare(valueB);
    });
}

module.exports = { sortString };
