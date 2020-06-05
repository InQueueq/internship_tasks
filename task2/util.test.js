const lc = require('letter-count');

const {checkExtension, checkWorkingTime, getTotalDays, languages, calculateDeadline,
    calculateOrderPrice, calculateWorkingHoursToComplete, generateRandomText} = require('./main_script.js')


test('Should check if extension is in the list and return true',()=>{
    const in_list = checkExtension('test.doc');
    expect(in_list).toBeTruthy()
})

test('Should check if extension is not in the list and return true',()=>{
    const in_list = checkExtension('test.txt');
    expect(in_list).toBeFalsy();
})

test('Should check if working time is not yet spent',()=>{
    let day = new Date(2020,5,1,8);
    const working_time = checkWorkingTime(day)
    expect(working_time).toBe(9);
})

test('Should check if some of the working time is already spent',()=>{
    let day = new Date(2020,5,1,12);
    const working_time = checkWorkingTime(day)
    expect(working_time).toBe(7);
})

test('Should check if all of the working time is already spent',()=>{
    let day = new Date(2020,5,1,20);
    const working_time = checkWorkingTime(day)
    expect(working_time).toBe(0);
})

test('Should check if the function counts all weekends which were jumped over(1 week)  ',()=>{
    let day = new Date(2020,5,1,20); // 6/1/2020
    const total_days = getTotalDays(day,5)
    expect(total_days).toBe(7);
})

test('Should check if the function counts all weekends which were jumped over(2 weeks) ',()=>{
    let day = new Date(2020,5,1,20); // 6/1/2020
    const total_days = getTotalDays(day,10)
    expect(total_days).toBe(14);
})

test('Should check if the function counts all weekends which were jumped over(n weeks) ',()=>{
    let min = 10;
    let max = 200;
    let random = Math.trunc(Math.random() * (+max - +min) + +min);
    let day = new Date(2020,5,1,4); // 6/1/2020
    const total_days = getTotalDays(day,random);
    let count_weekends =0;

    for(i =day.getDay();i<=total_days;i++){
        if(i % 7 === 0 || i % 7 === 6){
            count_weekends++;
        }
    }
    let check_day = new Date(2020,5,day.getDate() + total_days,4);
    expect(total_days).toBe(random+count_weekends);
})

test('Should check if the ua test has right minimum price(manual input)',()=>{
    const price = calculateOrderPrice(languages.ua,"123123123131",false);
    expect(price).toBe(50);
})

test('Should check if the ru test has right minimum price(manual input)',()=>{
    const price = calculateOrderPrice(languages.ru,"123123123131",false);
    expect(price).toBe(50);
})

test('Should check if the en test has right minimum price(manual input)',()=>{
    const price = calculateOrderPrice(languages.en,"123123123131",false);
    expect(price).toBe(120);
})

test('Should check if the ua test has right minimum price(file input)',()=>{
    const price = calculateOrderPrice(languages.ua,"test_files/pricetest.doc",true);
    expect(price).toBe(50);
})

test('Should check if the en test has right minimum price(file input)',()=>{
    const price = calculateOrderPrice(languages.en,"test_files/pricetest.doc",true);
    expect(price).toBe(120);
})

test('Should check if the ua test has right price + 20% for extension(file input)',()=>{
    const price = calculateOrderPrice(languages.ua,"test_files/pricetest.txt",true)
    let expected_value = lc.countFromFile("test_files/pricetest.txt").chars*languages.ua.price;
    expected_value += expected_value*0.2; // 20% for .txt
    expect(price).toBe(Math.round(expected_value* 100) / 100);
})

test('Should check if the en test has right price + 20% for extension(file input)',()=>{
    const price = calculateOrderPrice(languages.en,"test_files/pricetest.txt",true)
    let expected_value = lc.countFromFile("test_files/pricetest.txt").chars*languages.en.price;
    expected_value += expected_value*0.2; // 20% for .txt
    expect(price).toBe(Math.round(expected_value* 100) / 100);
})

test('Should check if the en test has right calculated price(manual input)',()=>{
    let input_st = "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123v123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"
    const price = calculateOrderPrice(languages.en,input_st,false);
    let expected_value = lc.count(input_st,'-c').chars * languages.en.price;

    expect(price).toBe(Math.round(expected_value* 100) / 100);
})


test('Should check if the ua test has right calculated price(manual input)',()=>{
    let input_st = "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123v123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"
    const price = calculateOrderPrice(languages.ua,input_st,false);
    let expected_value = lc.count(input_st,'-c').chars * languages.ua.price;

    expect(price).toBe(Math.round(expected_value* 100) / 100);
})

test('Should check if the text has right minimum deadline(manual input) pre-working day',()=>{
    let day = new Date(2020,5,1,4); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"123",false, day);
    let expected_value = new Date(2020,5,1,19-checkWorkingTime(day) + 1); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(manual input) inside of the working day',()=>{
    let day = new Date(2020,5,1,12); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"123",false, day);
    let expected_value = new Date(2020,5,1,19-checkWorkingTime(day) + 1); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(manual input) post working day',()=>{
    let day = new Date(2020,5,1,20); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"123",false, day);

    let expected_value = new Date(2020,5,2,11); // next day working time starts at 10 + 1 for minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(manual input) weekend-check(Saturday)',()=>{
    let day = new Date(2020,5,6,4); // 6/6/2020
    const deadline_date = calculateDeadline(languages.ua,"123",false, day);
    let expected_value = new Date(2020,5,8,11); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(manual input) weekend-check(Sunday)',()=>{
    let day = new Date(2020,5,7,15); // 6/7/2020
    const deadline_date = calculateDeadline(languages.ua,"123",false, day);
    let expected_value = new Date(2020,5,8,11); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(file input) pre-working day',()=>{
    let day = new Date(2020,5,1,4); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"test_files/deadline_minimum.txt",true, day);
    let expected_value = new Date(2020,5,1,19-checkWorkingTime(day) + 1); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(file input) inside of the working day',()=>{
    let day = new Date(2020,5,1,12); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"test_files/deadline_minimum.txt",true, day);
    let expected_value = new Date(2020,5,1,19-checkWorkingTime(day) + 1); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(file input) post working day',()=>{
    let day = new Date(2020,5,1,20); // 6/1/2020
    const deadline_date = calculateDeadline(languages.ua,"test_files/deadline_minimum.txt",true, day);

    let expected_value = new Date(2020,5,2,11); // next day working time starts at 10 + 1 for minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(file input) weekend-check(Saturday)',()=>{
    let day = new Date(2020,5,6,4); // 6/6/2020
    const deadline_date = calculateDeadline(languages.ua,"test_files/deadline_minimum.txt",true, day);
    let expected_value = new Date(2020,5,8,11); // +1 ----> minimum order completion time

    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})

test('Should check if the text has right minimum deadline(file input) weekend-check(Sunday)',()=>{
    let day = new Date(2020,5,7,15); // 6/7/2020
    const deadline_date = calculateDeadline(languages.ua,"test_files/deadline_minimum.txt",true, day);
    let expected_value = new Date(2020,5,8,11); // +1 ----> minimum order completion time
    expect(deadline_date).toBe(expected_value.toDateString() + " " + expected_value.getHours() + " O'clock");
})


test('Should check if the paid extensions take 20% more time to complete ua',()=>{
    const hours_txt = calculateWorkingHoursToComplete("test_files/deadline_extension_test.txt",languages.ua,);
    const hours_doc = calculateWorkingHoursToComplete("test_files/deadline_extension_test.doc",languages.ua);
    expect(hours_txt/hours_doc).toBe(1.2)
})
test('Should check if the paid extensions take 20% more time to complete en',()=>{
    const hours_txt = calculateWorkingHoursToComplete("test_files/deadline_extension_test.txt",languages.en,);
    const hours_doc = calculateWorkingHoursToComplete("test_files/deadline_extension_test.doc",languages.en);
    expect(hours_txt/hours_doc).toBe(1.2)
})

test('Should check if the deadline date is right(random text) before working day and time required < 9 hours',()=>{
    let day = new Date(2020,5,1,5); // 6/1/2020
    let deadline_date = calculateDeadline(languages.en,'test_files/test_data.txt',true, day);
    let chars_count = lc.countFromFile('test_files/test_data.txt').chars
    let hours_needed = 0.5 + (chars_count/languages.en.processingSpeed);
    hours_needed += hours_needed * 0.2;
    hours_needed = Math.round(hours_needed)
    let hour_of_deadline = 10 + hours_needed
    let checking_day =  new Date(day.getFullYear(),day.getMonth(),day.getDay()).toDateString() +" "+ hour_of_deadline + " O'clock"
    expect(deadline_date).toBe(checking_day);
})

test('Should check if the deadline date is right(random text) inside of the working day and time required < remaining working hours',()=>{
    let day = new Date(2020,5,1,12); // 6/1/2020
    let deadline_date = calculateDeadline(languages.en,'test_files/test_data.txt',true, day);
    let chars_count = lc.countFromFile('test_files/test_data.txt').chars
    let hours_needed = 0.5 + (chars_count/languages.en.processingSpeed);
    hours_needed += hours_needed * 0.2;
    hours_needed = Math.round(hours_needed)
    let hour_of_deadline = day.getHours() + hours_needed;
    let checking_day =  new Date(day.getFullYear(),day.getMonth(),day.getDay()).toDateString() +" "+ hour_of_deadline + " O'clock"
    expect(deadline_date).toBe(checking_day);
})

//
test('Should check if the deadline date is right(random text) any day, any time, any language',()=>{
    let min = 100;
    let max = 10000;
    let random = Math.trunc(Math.random() * (+max - +min) + +min);
    let day = new Date(2020,5,1,1); // 6/1/2020
    const text = generateRandomText(random);
    let chars_count = lc.count(text,'-c').chars;
    let hours_needed = 0.5 + (chars_count / languages.en.processingSpeed);
    hours_needed = Math.round(hours_needed);
    let days_needed = Math.ceil((hours_needed - checkWorkingTime(day))/9);
    if((hours_needed - checkWorkingTime(day)) % 9 === 0){
        days_needed++;
    }
    let total_days = getTotalDays(day,days_needed);
    let deadline_date = calculateDeadline(languages.en,text,false, day);
    let deadline_hour;
    if(checkWorkingTime(day) > hours_needed && checkWorkingTime(day) === 9){
        deadline_hour = 10 + hours_needed
    }
    else if(checkWorkingTime(day) > hours_needed){
        deadline_hour = day.getHours() + hours_needed;
    }
    else{
        deadline_hour = 10 + ((hours_needed-checkWorkingTime(day)) % 9);
    }
    let checking_day =  new Date(2020,5,1 + total_days,10).toDateString() +" "+ deadline_hour + " O'clock"
    expect(deadline_date).toBe(checking_day);
})


