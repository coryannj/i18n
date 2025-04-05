
//require('../utils.js');
import { DateTime,Interval } from '../luxon.js';
import { read } from '../fs.js';
const input = read('../inputs/i18n/p04.txt');

let lines = input.split(/\n\n/).map((x)=>x.split(/[\r\n]+/).map((y)=>y.replace(/(Departure:\s+|Arrival:\s+)/g,'').split(/[\s,]+/)))

const toIsoStr = (month,day,year,time) => {
    //let [month,day,year,time] = str.match(/[:0-9a-zA-Z]+/g)
    
    let monthLookup = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}

    return `${year}-${monthLookup[month]}-${day}T${time}:00`
}

let travelTime = 0

lines.forEach(([[z1,m1,d1,y1,t1],[z2,m2,d2,y2,t2]])=>{
    let t1Time = DateTime.fromISO(toIsoStr(m1,d1,y1,t1), { zone: z1 })
    let t2Time = DateTime.fromISO(toIsoStr(m2,d2,y2,t2), { zone: z2 })

    let travelInMins = t2Time.diff(t1Time, 'minutes');

    travelTime+=travelInMins.toObject().minutes
})

console.log(travelTime)