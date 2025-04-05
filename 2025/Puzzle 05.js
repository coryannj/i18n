const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p05.txt', {encoding: "utf8", flag: "r", });


let lines = input.lines().mk2d()
console.log(lines)