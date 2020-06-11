var path = require('path');
var lc = require('letter-count');
var freeExtensions = [".doc", "docx", ".rtf"];
var workingDayEnd = 19;
var workingDayStart = 10;
var ua = {
    name: "Ukrainian",
    price: 0.05,
    processingSpeed: 1333
};
var ru = {
    name: "Russian",
    price: 0.05,
    processingSpeed: 1333
};
var en = {
    name: "English",
    price: 0.12,
    processingSpeed: 333
};
function getHoursNeeded(count, language, multiplier) {
    if (count <= 0) {
        return 0;
    }
    var time = Math.max(1, 0.5 + (count / language.processingSpeed));
    return time * multiplier;
}
function calculateOrderPrice(count, language, multiplier) {
    if (count <= 0) {
        return 0;
    }
    var price = Math.max(1000, count) * language.price;
    return Math.round(100 * price * multiplier) / 100;
}
function calculateDeadline(hoursNeeded, startDate) {
    if (startDate === void 0) { startDate = new Date(); }
    while (true) {
        if (startDate.getHours() > workingDayEnd) {
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(10, 0, 0);
            continue;
        }
        if (startDate.getDay() === 6 || startDate.getDay() === 0) {
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(10, 0, 0);
            continue;
        }
        if (startDate.getHours() < workingDayStart) {
            startDate.setHours(10, 0, 0);
        }
        var hoursToEndDay = workingDayEnd - startDate.getHours();
        if (hoursNeeded < hoursToEndDay) {
            startDate.setHours(startDate.getHours() + hoursNeeded, 0, 0);
            return startDate;
        }
        hoursNeeded -= hoursToEndDay;
        startDate.setDate(startDate.getDate() + 1);
        startDate.setHours(10, 0, 0);
    }
}
// function main(){
//     const text:string = '../test_files/test_to_compare_with_site.doc';
//     const isFile:boolean = true;
//     const language:Lang = en;
//     const extension:string = path.extname(text);
//     const count:number = isFile ? lc.countFromFile(text).chars : text.length;
//     const isExpensive:boolean = !freeExtensions.includes(extension);
//     const timeMultiplier:number = isExpensive ? 1.2 : 1.0;
//     const priceMultiplier:number = isExpensive ? 1.2 : 1.0;
//     const orderPrice:number = calculateOrderPrice(50000, language,priceMultiplier);
//     const hoursNeeded:number = getHoursNeeded(50000, language, timeMultiplier);
//     const deadline:Date = calculateDeadline(hoursNeeded);
// }
//
// main();
