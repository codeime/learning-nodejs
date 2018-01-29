console.log('');
module.exports = function (...args) {
    var sum = 0;
    for (let a of args) {
        sum += a;
    }
    return sum;
}