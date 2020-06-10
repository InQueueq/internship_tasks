const path = require('path');
const lc = require('letter-count');

const freeExtensions = [".doc","docx",".rtf"];
const languages = {
    ua:{
        name: "Ukrainian",
        price: 0.05,
        processingSpeed:1333
    },
    ru: {
        name:'Russian',
        price: 0.05,
        processingSpeed:1333
    },
    en: {
        name: 'English',
        price: 0.12,
        processingSpeed:333
    },
}

function getHoursNeeded(count, language, multiplier){
    if (count <= 0) {
        return 0;
    }
    const time = Math.max(1, 0.5 + (count / language.processingSpeed))
    return time * multiplier;
}

function calculateOrderPrice(count, language, multiplier) {
    if (count <= 0) {
        return 0;
    }
    const price = Math.max(1000, count) * language.price;
    return Math.round(100 * price * multiplier) / 100;
}

function calculateDeadline(count, language, multiplier, startDate = new Date()){
    const workingDayEnd = 19;
    const workingDayStart = 10;

    let hoursNeeded = Math.round(getHoursNeeded(count, language, multiplier));
    while(true){
        if(startDate.getHours() > workingDayEnd){
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(10,0,0);
            continue;
        }
        if (startDate.getDay() === 6 || startDate.getDay() === 0) {
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(10,0,0);
            continue
        }
        if(startDate.getHours() < workingDayStart){
            startDate.setHours(10,0,0);
        }

        const hoursToEndDay = workingDayEnd - startDate.getHours();
        if(hoursNeeded < hoursToEndDay){
            startDate.setHours(startDate.getHours() + hoursNeeded,0,0)
            return startDate;
        }

        hoursNeeded -= hoursToEndDay;
        startDate.setDate(startDate.getDate() + 1);
        startDate.setHours(10,0,0);
    }
}

// function main(){
//     const text = '../test_files/test_to_compare_with_site.doc';
//     const isFile = true;
//     const language = languages.en;
//     const extension = path.extname(text);
//     const count = isFile ? lc.countFromFile(text).chars : text.length;
//     const isExpensive = !freeExtensions.includes(extension);
//     const timeMultiplier = isExpensive ? 1.2 : 1.0;
//     const priceMultiplier = isExpensive ? 1.2 : 1.0;
//     const orderPrice = calculateOrderPrice(14136, language,priceMultiplier);
//     const deadline = calculateDeadline(1122, language, timeMultiplier);
//
//
// }





module.exports = {calculateOrderPrice : calculateOrderPrice, calculateDeadline: calculateDeadline, languages : languages}
