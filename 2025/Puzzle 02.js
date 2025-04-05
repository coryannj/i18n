const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p02.txt', {encoding: "utf8", flag: "r", });

let frequencies = input.lines().map((x)=>Date.parse(x)).counts()
let wave = new Date(Number(Object.keys(frequencies).find((x)=>frequencies[x]===4)))

console.log(wave.toISOString().slice(0,-5)+"+00:00")