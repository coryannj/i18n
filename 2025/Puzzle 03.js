const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p03.txt', {encoding: "utf8", flag: "r", });

const rules = (str) => {
    let hasNum = /[\d]/.test(str)
    let hasUpper = /[A-Z]/.test(str.normalize('NFD').replace(/\p{Diacritic}/gu, ''))
    let hasLower = /[a-z]/.test(str.normalize('NFD').replace(/\p{Diacritic}/gu, ''))
    let ascii = str.split('').map((x)=>x.charCodeAt(0)).some((y)=>y>128)
    return hasNum && hasUpper && hasLower && ascii
    //return [hasNum,hasUpper,hasLower,ascii].every((x)=>x===true)
}

const passwords = input.lines().filter((x)=>x.length >= 4 && x.length<=12 && rules(x))
console.log(passwords.length)
