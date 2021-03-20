module.exports = (arrToCount, itemToCount) => {
    return arrToCount.reduce((acc, review) => {
        return acc + review[itemToCount];
    }, 0);
};