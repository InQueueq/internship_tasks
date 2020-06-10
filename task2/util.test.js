const lc = require('letter-count');

const { languages ,calculateDeadline, calculateOrderPrice} = require('./main_script.js')



test("test price calculation", () => {
    const actualPrice = 129.25;
    const price = calculateOrderPrice(2585, languages.ru, 1.0);
    expect(price).toBe(actualPrice);
});

test("test deadline", () => {
    const start = new Date("Mon, 01 June 2020 13:00:00");
    const properEnd =  new Date("Mon, 01 Jun 2020 17:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline morning", () => {
    const start = new Date("Mon, 01 June 2020 8:00:00");
    const properEnd =  new Date("Mon, 01 Jun 2020 14:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline after working day", () => {
    const start = new Date("Mon, 01 June 2020 20:00:00");
    const properEnd =  new Date("Tue, 02 Jun 2020 14:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline during working day", () => {
    const start = new Date("Mon, 01 June 2020 12:00:00");
    const properEnd =  new Date("Mon, 01 Jun 2020 16:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline on weekend", () => {
    const start = new Date("Sat, 06 June 2020 13:00:00");
    const properEnd =  new Date("Mon, 08 Jun 2020 14:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline on friday evening", () => {
    const start = new Date("Fri, 05 June 2020 20:00:00");
    const properEnd =  new Date("Mon, 08 Jun 2020 14:00:00");

    const deadline = calculateDeadline(1100, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline heavy order", () => {
    const start = new Date("Mon, 01 June 2020 10:00:00");
    const properEnd =  new Date("Fri, 05 Jun 2020 11:00:00");

    const deadline = calculateDeadline(12312, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});

test("test deadline heavier order", () => {
    const start = new Date("Mon, 01 June 2020 10:00:00");
    const properEnd =  new Date("Thu, 16 Jul 2020 14:00:00");

    const deadline = calculateDeadline(100000, languages.en, 1.0, start);
    expect(deadline.toString()).toBe(properEnd.toString());
});
