const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p09.txt', {encoding: "utf8", flag: "r", });

const lines = input.lines().mk2d(': ').map((x)=>[x[0].split('-').map(Number),x[1].split(', ')])
// const checkDate = ([x,y,z]) => {
//     let days = new Map([[1,31],[2,28],[3,31],[4,30],[5,31],[6,30],[7,31],[8,31],[9,30],[10,31],[11,30],[12,31]])
//     // dmy ymd mdy ydm
//     let dcheck = (day,month,year) => month <= 12 && (
//         (month !== 2 && day<=days.get(month))||
//         (month === 2 && year%4 !== 0 && day<=days.get(month))||
//         (month===2 && year%4 === 0 && day<=days.get(month)+1))


//     let dmy = dcheck(x,y,z) ? "dmy" : ""
//     let ymd = dcheck(z,y,x) ? "ymd" : ""
//     let mdy = dcheck(y,x,z) ? "mdy":""
//     let ydm = dcheck(y,z,x) ? "ydm": ""
//     return [dmy,ymd,mdy,ydm]
// }

const checkDate = (d) => {
    let [x,y,z] = d.map((dv)=> dv < 10 ? `0${dv}` : `${dv}`)

    let dmy = !isNaN(Date.parse(`20${z}-${y}-${x}T00:00:00Z`)) ? "dmy" : ""
    let ymd = !isNaN(Date.parse(`20${x}-${y}-${z}T00:00:00Z`)) ? "ymd" : ""
    let mdy = !isNaN(Date.parse(`20${z}-${x}-${y}T00:00:00Z`)) ? "mdy":""
    let ydm = !isNaN(Date.parse(`20${x}-${z}-${y}T00:00:00Z`)) ? "ydm": ""

    return [dmy,ymd,mdy,ydm]
}


let names = Object.fromEntries([...new Set(lines.flatMap((x)=>x[1]))].map((x)=>
    {
        let dates = lines.flatMap(([d,n])=>n.includes(x)?[d]:[]).map((z)=>checkDate(z))
        let format = ['dmy','ymd','mdy','ydm'].filter((f)=>dates.every((ds)=>ds.includes(f)))
        return [x,format[0].split('').join('-')]
    }
))

console.log(Object.entries(names).filter(([n,v])=> lines.some(([ds,ns])=>ds.join('-')===v.replace('d','11').replace('m','9').replace('y','1') && ns.includes(n))).map((x)=>x[0]).sort().join(' '))