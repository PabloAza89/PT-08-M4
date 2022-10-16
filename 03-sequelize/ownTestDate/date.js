let date = new Date().toLocaleString("af-ZA", {timeZone:"America/Argentina/Buenos_Aires"}).replace(/\//g,'-').split('-').reverse().join('-');
console.log(date)
let qq = new Date().toLocaleString({timeZone:"America/Argentina/Buenos_Aires"}).split(' ')[0].split('/').reverse().join('-');
console.log(qq)
let ww = new Date().toLocaleString({timeZone:"America/Argentina/Buenos_Aires"}).split('-').reverse().join('-');
console.log(ww)
