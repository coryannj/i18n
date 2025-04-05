const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p12.txt', {encoding: "utf8", flag: "r", });

let lines = input.lines().map((x)=>x.split(', ')).map((x,ix)=>[x[0]].concat(x[1].split(': '),ix))

let english = lines.toSorted((a,b)=>a[0].localeCompare(b[0],'en', { sensitivity: 'base', ignorePunctuation: true })||b[0].localeCompare(a[0],'en', { sensitivity: 'base', ignorePunctuation: true }))

let swedish = lines.toSorted((a,b)=>a[0].localeCompare(b[0],'sv', { sensitivity: 'base', ignorePunctuation: true })||b[0].localeCompare(a[0],'en', { sensitivity: 'base', ignorePunctuation: true }))
let dutch = lines.map((x)=>[x[0].replace(/^[\sa-z]+/m,'')].concat(x.slice(1))).toSorted((a,b)=>a[0].localeCompare(b[0],'nl', { sensitivity: 'base', ignorePunctuation: true })||b[0].localeCompare(a[0],'en', { sensitivity: 'base', ignorePunctuation: true }))

console.log([english,swedish,dutch].map((x)=>x[Math.floor(x.length/2)][2]).map(Number).multiply())