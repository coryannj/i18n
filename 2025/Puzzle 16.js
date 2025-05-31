const fs = require('fs');
const buffer = require('buffer');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p16.txt', {encoding: "utf8", flag: "r", });

let s = Buffer.from(input,'utf-8')

let k = s.toString('hex')

console.log(k)

// From https://codegolf.stackexchange.com/questions/12739/convert-cp437-to-utf-8
c=t=>t[p='replace'](/[\S\s]/g,s=>String.fromCharCode(...(z=(`BjuBjvBl1Bl2BkzBkwAciBh4BgrBh5Bk2Bk0Bl6Bl7BjwBgaBgkAmtAd8D2CnBfwAncAmpAmrAmqAmoAqnAmsBg2Bgc${','.repeat(96)}DjB0AhAaAcA8AdAfAiAjAgAnAmAkDgDhDlAeDiAsAuAqAzAxB3DyA4CiCjClAg7,b6A9AlArAyApDtCqD6DbAxcCsD9D8ChCrD7Bf5Bf6Bf7Bb6Bc4GtGuGiGhGvGdGjGpGoGnBbkBboBckBccBbwBb4BcsGqGrGmGgBe1GyGsGcBe4GzBe0GwGxGlGkGeGfBe3Be2BbsBbgBewBesBf0Bf4BeoE9A7FfEoFvErD1EsFyFkE1EcAqmEuEdAqxAshCxAslAskAxsAxtAvArsCwAqhD3AqiAf3CyBfkCg`[p](/G/g,'Bd')[p](/[A-F]/g,s=>','+'745qp6'[s[o='charCodeAt']()%6])).split`,`.map(i=>parseInt(i,36))[s=s[o]()]||s)<(x=128)?[z]:z<2048?[0|192+z/64,x+z%64]:[0|224+z/4096,0|x+z%4096/64,x+z%64]))

let str = c(input)

//.split('').map(s=>`\\x${s.charCodeAt(0).toString(16)}`).join('')

// let b = Buffer.from(input,'utf8')
// console.log(Buffer.from(input,'utf8'))




function convertStringToUTF8ByteArray(str) {
    let binaryArray = new Uint8Array(str.length)
    Array.prototype.forEach.call(binaryArray, function (el, idx, arr) { arr[idx] = str.charCodeAt(idx) })
    return binaryArray
}

console.log(convertStringToUTF8ByteArray(input))