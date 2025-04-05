const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p01.txt', {encoding: "utf8", flag: "r", });

let lines = input.lines().map((x)=>x.trim())

const fee = (str) => {
    const encoder = new TextEncoder();
    const view = encoder.encode(str);
    //console.log('         ')
    //console.log(str)
    let smsCost = view.length<=160 ? 11 : 0
    let tweetCost = str.length<=140 ? 7 : 0
    //console.log('bytes ',view.length,smsCost,' chars ',str.length,tweetCost)
    if(smsCost > 0 && tweetCost > 0){
        //console.log('discount ',13)
        return 13
    } else {
        //console.log('no discount ',smsCost+tweetCost)
        return smsCost+tweetCost
    }
}

console.log(lines.map((x)=>fee(x)).sum())



