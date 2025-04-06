const fs = require('fs');
const buffer = require('buffer');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p13.txt', {encoding: "utf8", flag: "r", });

let lines = input.lines(2);
let words = lines[0].lines();
let crossword = lines[1].lines().map((x)=>x.trim()).map((x)=>x.split('').map((y,iy)=>[y,iy]).find(([z,zx])=>z!=='.').concat(x.length));

const wordChk = (str) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[a-zß]+/g,'').length === 0

const toStr = (hexd,enc) => enc !== 'utf16be' ? hexd.toString(enc) : hexd.swap16().toString('utf16le')

const crossChk = (hex) => {
    let 
        word,
        bom = /^feff|^fffe|^efbbbf/m.test(hex) ? hex.slice(0,4) : false,
        hexBuf = !bom ? Buffer.from(hex,'hex') : Buffer.from(`${bom === 'efbb' ? hex.slice(6) : hex.slice(4)}`,'hex')
        
    if(!bom){
        for (const e of ['utf8','latin1','utf16le','utf16be']){
            word = toStr(hexBuf,e);

            if(wordChk(word)) break;
        }
    } else {
        word = bom === 'efbb' ? toStr(hexBuf,'utf8') : toStr(hexBuf,`${bom === 'fffe' ? 'utf16le' : 'utf16be'}`)
    }

    return crossword.some(([l,lInd,len])=> word.length === len && word[lInd] === l)
}

console.log(words.map((x,ix)=> crossChk(x) ? ix+1 : 0).sum())