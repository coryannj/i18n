const fs = require('fs');
require('../utils.js');
const input = fs.readFileSync('../inputs/i18n/p14.txt', {encoding: "utf8", flag: "r", });

let shaku = 10/33

let units= {
    間: 6*shaku,
    丈: 10*shaku,
    町: 360*shaku,
    里: 12960*shaku,
    尺: 1*shaku,
    毛: 0.0001*shaku,
    厘: 0.001*shaku,
    分: 0.01*shaku,
    寸: 0.1*shaku
};

let 
    base = { 一 :1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 },
    tens = { 十 :10, 百: 100, 千: 1000, 万: 10000, 億: 100000000 },
    cache = {};

const m2 = (num)=> {
    if(cache[num] !== undefined) return cache[num];
        
    if(num.length <= 1) return (base[num] ?? tens[num] ?? 0);
   
    let 
        maxTens = Object.entries(tens).findLast(([u,v])=>num.includes(u)),
        split = num.split(maxTens[0]),
        ans = ((m2(split[0],0) || 1) * maxTens[1]) + m2(split[1],0)

    cache[num] = ans;
    
    return ans
}

let lines = input.lines().map((x)=>x.split(' × ').map((y)=>[y.slice(0,-1),y.slice(-1)]))

console.log(lines.map(([[n1,u1],[n2,u2]])=>Math.round((m2(n1)*units[u1])*(m2(n2)*units[u2]))).sum())