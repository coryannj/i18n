import { DateTime, Duration, FixedOffsetZone, IANAZone, Info, Interval, InvalidZone, Settings, SystemZone, VERSION, Zone } from '../luxon.js';
import { read } from '../fs.js';
const input = read('../inputs/i18n/p15.txt');

let lines = input.split(/\n\n/)
Settings.defaultLocale = 'en-GB'
Settings.defaultWeekSettings = { firstDay: 1, minimalDays: 3, weekend: [6, 7] }

let [sDay,sMonth,sYear] = [1,1,2022]

const workstart = {hour:8,minute:30}
const workend = {hour:17,minute:0}
const start = DateTime.utc(sYear,sMonth,sDay);

const timeSort = (a,b) => {
    if(a<b){
        return -1
    } else if (a>b) {
        return 1
    } else {
        return 0
    }
}

const getWorkdays = (loc,isOffice) => {
    let 
        [l,tzone,h] = loc.split(/\t/),
        startUTCdate = start.setZone(tzone),
        allDays = [],
        hols = h.split(';').map((y)=>DateTime.fromFormat(`${y.split(' ')[0].length === 1 ? 0 :''}${y}`,"dd LLLL yyyy", {zone: tzone}))

    if(startUTCdate.weekday < 6){
        if(isOffice && startUTCdate.hour < workend.hour && startUTCdate.minute < workend.minute){
            allDays.push(Interval.fromDateTimes(startUTCdate,startUTCdate.set(workend)))
        } 

        if(!isOffice){
            allDays.push(Interval.fromDateTimes(startUTCdate,startUTCdate.startOf('day').plus({days:1})))
        }
    }
    
    for(let i=1;i<=52;i++){
        for(let j=1; j<=5; j++){
            let getDay = DateTime.fromObject({localWeekYear: sYear, localWeekNumber: i, localWeekday: j},{zone:tzone})

            if(!hols.some((x)=>x.hasSame(getDay,'day') && x.hasSame(getDay,'month'))){
                if(isOffice){
                    allDays.push(Interval.fromDateTimes(getDay.set(workstart),getDay.set(workend)))
                } else {
                    allDays.push(Interval.fromDateTimes(getDay,getDay.plus({days:1})))
                }
            }
        }
    }


    if(!isOffice){
        allDays = Interval.merge(allDays)
    }

    return allDays
}

let offices = Interval.merge(lines[0].split(/\n/).flatMap((x)=> getWorkdays(x,true)).sort((a,b)=>timeSort(a,b)))

let customers = lines[1].split(/\n/).map((x)=> getWorkdays(x,false))

let overtime = customers.map((x)=>x.flatMap((y)=>y.difference(...offices).map((y)=>y.length('minutes'))).reduce((a,b)=>a+b,0)).sort((a,b)=>a-b)

console.log(overtime,overtime.at(-1)-overtime[0])
