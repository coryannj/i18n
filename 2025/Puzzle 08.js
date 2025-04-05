const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p08.txt', {encoding: "utf8", flag: "r", });

const rules = (str) => {
    let normalised = str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    let letters = normalised.replace(/[^a-z]+/g,'')

    let rightLen = str.length >= 4 && str.length <= 12
    let hasNum = /[\d]/.test(str)
    let hasVowel = /[aeiou]/.test(normalised)
    let hasConsonant = /[bcdfghjklmnpqrstvwxyz]/.test(normalised)
    let noRecurring = new Set(letters.split('')).size === letters.length

    return rightLen && hasNum && hasVowel && hasConsonant && noRecurring
}

const passwords = input.lines().filter((x)=>rules(x))
console.log(passwords.length)
