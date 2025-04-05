const fs = require('fs');
const buffer = require('buffer');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p06.txt', {encoding: "utf8", flag: "r", });

let lines = input.lines(2)

const decode = (str,ind) =>{
    let lineNo = ind+1
    let third = lineNo%3===0
    let fifth = lineNo%5===0

    if(!third && !fifth){
        return str
    } else {
        const latin1Buffer = buffer.transcode(Buffer.from(str), "utf8", "latin1");
        const latin1String = latin1Buffer.toString("latin1");
        const latin2Buffer = buffer.transcode(Buffer.from(latin1String), "utf8", "latin1");
        const latin2String = latin2Buffer.toString("utf8");

        if (third && !fifth || (!third && fifth)){
            return latin2String
        } else {
            const latin3Buffer = buffer.transcode(Buffer.from(latin2String), "utf8", "latin1");
            const latin3String = latin3Buffer.toString("utf8");
            return latin3String
        }
    }
}

let words = lines[0].lines().map((x,ix)=>[decode(x,ix),ix+1])
let crossword = lines[1].lines().map((x)=>x.trim())

let solution = 0

crossword.forEach((w)=>{
    let wordLen = w.length
    let [l,lInd] = w.split('').map((x,ix)=>[x,ix]).filter(([x,ix])=>x!=='.')[0]

    let [match,matchRow] = words.find(([x,ind])=>x.length === wordLen && x[lInd].localeCompare(l,'en', { sensitivity: 'base' })===0)
    solution+=matchRow
})

console.log(solution)