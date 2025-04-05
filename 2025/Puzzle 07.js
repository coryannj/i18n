import { DateTime,Interval } from '../luxon.js';
import { read } from '../fs.js';
const input = read('../inputs/i18n/p07.txt');

let lines = input.split(/[\r\n]+/).map((x)=>x.split(/\s+/)).map((y)=>[y[0].slice(0,23),y[0].slice(23),parseInt(y[1]),parseInt(y[2])])

const checkZone = (timestamp,offset) => {
    let halifax = DateTime.fromISO(timestamp,{zone: 'America/Halifax'})
    let santiago = DateTime.fromISO(timestamp,{zone: 'America/Santiago'})

    return halifax.toISO()===`${timestamp}${offset}` ? halifax : santiago
}

let answer = 0

lines.forEach(([timestamp,offset,correct,incorrect],ind)=>{
    answer+=((ind+1) * checkZone(timestamp,offset).minus({ minutes: incorrect }).plus({ minutes: correct }).hour)
})

console.log(answer)