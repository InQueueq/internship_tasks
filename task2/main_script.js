const path = require('path');
const lc = require('letter-count');

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

/**
 *
 * @param {String} input      path to the file with text
 * @returns {boolean}           checks whether customer should pay extra 20% for the extension
 */
function checkExtension(input){
    let free_extensions = [".doc","docx",".rtf"];
    return free_extensions.includes(path.extname(input));
}

/**
 *
 * @param {Object} language     language of the text
 * @param {String} input        text or path to the file with text
 * @param {Boolean} is_file     specify input type
 * @returns {number}            order price(In UAH)
 */
function calculateOrderPrice(language, input, is_file) {
    let price;
    let chars_count;
    // File input
    if(is_file){
        let has_free_extension = checkExtension(input);
        if(!has_free_extension){
            chars_count = lc.countFromFile(input).chars;
            price = chars_count*language.price;
            price += price * 0.2;
        }
        else{
            chars_count = lc.countFromFile(input).chars;
            price = chars_count*language.price;
        }
    }
    // Manual input
    else{
        chars_count = lc.count(input,'-c').chars;
        price = chars_count*language.price;

    }
    if(price < 50 && (language.name === "Russian" || language.name === "Ukrainian")){
        price = 50;
    }
    else if(language.name === "English" && price < 120){
        price = 120;
    }
    return Math.round(price * 100) / 100;

}

/**
 *
 * @param {Date} day       order day
 * @param {number} working_day_start     time(in hours) when working day starts
 * @param {number} working_day_end         time(in hours) when working day ends
 * @returns {number}        time left for working day to end
 */
function checkWorkingTime(day, working_day_start=10, working_day_end = 19){
    // At 18:59 day is considered to be ended.
    if(day.getHours() < working_day_start){
        return 9;
    }
    else if(day.getHours() > working_day_end){
        return 0;
    }
    else{
        return working_day_end - day.getHours();
    }
}

/**
 *
 * @param {Date} today      order day
 * @param {number} days_needed      WORKING days needed to complete the order
 * @returns {number}       total number of days INCLUDING weekends
 */
function getTotalDays(today,days_needed) {
    let n = days_needed;
    for(let i = today.getDay(); i < n + today.getDay(); i++ ) { // Count weekends
        if(i % 7  === 0 || i % 7 === 6){
            days_needed++;
            n++;
        }
    }
    let deadline_day = (today.getDay() + days_needed) % 7;
    if(deadline_day === 6){
        days_needed += 2;
    }
    else if(deadline_day === 0){
        days_needed++;
    }
    return days_needed;
}

/**
 *
 * @param {String} input     path to the file with text
 * @param {Object} language     language of the text
 * @returns {number}        calculated time(in hours) to complete the order
 */
function calculateWorkingHoursToComplete(input, language){
    let has_free_extension = checkExtension(input);
    let chars_count = lc.countFromFile(input).chars;
    let hours_to_complete = 0.5 + (chars_count/language.processingSpeed);
    if(!has_free_extension){
        hours_to_complete += hours_to_complete * 0.2; // 20%
    }
    return hours_to_complete;
}

/**
 *
 * @param {Object} language     language of the text
 * @param {String }input        text or path to the file with text
 * @param {Boolean} is_file     specify input type
 * @param {Date} day_of_order
 * @returns {string}            formatted date of deadline
 */
function calculateDeadline(language, input, is_file, day_of_order = new Date()){
    let hours_to_complete;
    let chars_count;

    // File input
    if(is_file){
        hours_to_complete = Math.round(calculateWorkingHoursToComplete(input,language));
    }
    // Manual input
    else{
        chars_count = lc.count(input,'-c').chars;
        hours_to_complete = 0.5 + (chars_count / language.processingSpeed);
        hours_to_complete = Math.round(hours_to_complete);
    }
    let hour_of_deadline;
    let days_needed = 0;
    let work_time_remaining = checkWorkingTime(day_of_order);
    // Weekends
    if(day_of_order.getDay() === 6 || day_of_order .getDay() === 0){
        days_needed = Math.trunc(hours_to_complete /9);
        hour_of_deadline = 10 + (hours_to_complete % 9);
        days_needed = getTotalDays(day_of_order ,days_needed);
    }
    // Weekday
    else{
        // Full day ahead and work takes less than remaining time to work
        if(work_time_remaining > hours_to_complete && work_time_remaining === 9){
            hour_of_deadline = 10 + hours_to_complete;
        }
        // During the working day and work takes less than remaining time to work
        else if(work_time_remaining > hours_to_complete){
            hour_of_deadline = day_of_order.getHours() + hours_to_complete;
        }
        // During the working day and work takes more than remaining time, or after the working day, or before but it takes more than 9 hours.
        else{
            days_needed = Math.ceil((hours_to_complete - work_time_remaining)/9);
            hour_of_deadline = 10 + ((hours_to_complete-work_time_remaining) % 9);
            if((hours_to_complete - work_time_remaining) % 9 === 0){
                days_needed++;
            }
            days_needed = getTotalDays(day_of_order ,days_needed);
        }
    }
    return new Date(day_of_order.getFullYear(), day_of_order.getMonth(), day_of_order.getDate()+days_needed).toDateString()
        + ` ${hour_of_deadline} O'clock`;

}

// It's recommended to use files with no newlines to compare with the actual site.
// Otherwise the lengths of the files will differ.

console.log(calculateOrderPrice(languages.ru,"../test_files/test_to_compare_with_site.txt",true));
console.log(calculateDeadline(languages.ru,"../test_files/test_to_compare_with_site.txt",true));

/**
 *
 * @param {String} length    length of generated text(in characters)
 * @returns {String}    text consisting of 1 string(to omit charging for newlines
 */
function generateRandomText(length){
    let text = "";
    for(i = 0;i < length/13;i++){
        text += Math.random().toString(36).substr(2, length);
    }
    return text;
}

module.exports.checkExtension = checkExtension;
module.exports.getTotalDays = getTotalDays;
module.exports.checkWorkingTime = checkWorkingTime;
module.exports.calculateOrderPrice = calculateOrderPrice;
module.exports.calculateDeadline = calculateDeadline;
module.exports.calculateWorkingHoursToComplete = calculateWorkingHoursToComplete;
module.exports.languages = languages;
module.exports.generateRandomText = generateRandomText;
