import { getMonthlyCalendar, getSampleCalendar } from "../dist/index.js";

const getDay = (week) => week.days.map((day) => day.dayOfWeek);
const getDate = (week) => week.days.map((day) => day.date);

// const sample = getSampleCalendar(1, "thu", 30, "sun");
const sample = getMonthlyCalendar(2023, 7, { weekBeginsWith: "mon" });
const simpleDay = sample.weeks.map((week) => getDay(week));
const simpleDate = sample.weeks.map((week) => getDate(week));

console.log(sample.month);
console.log(simpleDay);
console.log(simpleDate);
