const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p05.txt', {encoding: "utf8", flag: "r", });

let lines = input.split(/\n/)
let points = []

lines.forEach((x,ix)=>{
    let row= []
    for(const l of x){
        row.push(l.codePointAt(0))
    }
    points.push(row)
})

let poop = 128169
let len = points.length
let colLen = points[0].length

let [r,c] = [0,0]
let inPoop = 0

while(r<len){
    if(points[r][c]===poop){
        inPoop++
    }
    r++
    c = (c+2)%colLen
}

console.log(inPoop)