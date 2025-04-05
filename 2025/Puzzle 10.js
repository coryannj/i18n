import { compareSync } from '../bcrypt.js';
import { read } from '../fs.js';
const input = read('../inputs/i18n/p10.txt');

function* cartesian(head, ...tail) {
    const remainder = tail.length > 0 ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r].join('');
}

let lines = input.split(/\n\n/)
let hashes = Object.fromEntries(lines[0].split(/[\r\n]+/).map((x)=>x.split(' ')))

// No idea why sort impacts no. of bcrypt calls but it does 
let allAttempts = lines[1].split(/[\r\n]+/).sort((a,b)=>{
    let aN = a.normalize('NFC')
    let bN = b.normalize('NFC')
    if(a === aN && b === bN ||(a !== aN && b!==bN)){
        return 0
    } else if (a===aN && b !== bN){
        return -1
    } else {
        return 1
    }
}).map((x)=>x.normalize('NFC')).reduce((a, c) => {return a[c] ? ++a[c] : a[c] = 1, a}, {})

let valid = 0
let usersFound = new Set()

Object.entries(allAttempts).forEach(([k,v])=>{
    let [user,attempt] = k.split(' ')
    if(!usersFound.has(user)){
        let getHash = hashes[user]
        if(compareSync(attempt,getHash)){          
            valid+=v
            usersFound.add(user)
        } else {
             let combos = attempt.split('').map((x)=>{
                let xN = x.normalize('NFD')
                if(x === xN){
                    return x
                } else {
                    return [x,xN]
                }
            })
            for(const combo of cartesian(...combos)){
                if(combo !== attempt && compareSync(combo,getHash)){
                    valid+=v
                    usersFound.add(user)
                    break;
                }
            }
        }
    } 
})

console.log(valid)