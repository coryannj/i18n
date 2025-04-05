const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p11.txt', {encoding: "utf8", flag: "r", });

let upper = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
let ody = /ΟΔΥΣΣΕΥΣ|ΟΔΥΣΣΕΩΣ|ΟΔΥΣΣΕΙ|ΟΔΥΣΣΕΑ|ΟΔΥΣΣΕΥ/
let len = upper.length

let lines = input.lines().map((x)=>x.toUpperCase())
let rotations = 0

lines.forEach((a)=>{
    for(i=1;i<len;i++){
        if(ody.test(a.split('').map((x)=>upper.includes(x) ? upper[(upper.indexOf(x)+i)%len]:x).join(''))){
            rotations+=i
            break;
        }
    }
})

console.log(rotations)