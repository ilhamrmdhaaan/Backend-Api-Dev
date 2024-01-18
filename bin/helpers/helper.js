const moment = require('moment');

const hex2bin = (string = '') => {
    let hex = string.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str
}


function formatedDate() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss')

    return date
}


module.exports = {
    hex2bin,
    formatedDate
}