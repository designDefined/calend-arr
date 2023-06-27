const ping = (): boolean => {
  console.log("pong");
  return false;
};

/**
 * Types
 */
type DayOfWeekString = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type DayOfWeekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type DayOfWeekExpression = DayOfWeekString | DayOfWeekNumber;
type Day = {
  date: number;
  month: number;
  dayOfWeek: DayOfWeekString;
  dayOfWeekNumber: DayOfWeekNumber;
  isLastDayOfMonth: boolean;
};

type Week = {
  week: number;
  month: number;
  days: Day[];
};

type Month = {
  month: number;
  weeks: Week[];
  days: Day[];
};

type Year = {
  year: number;
  months: Month[];
  weeks: Week[];
  days: Day[];
};

type MonthlyCalendar = Month & {
  weekBeginsWith: DayOfWeekString;
  weekBeginsWithNumber: DayOfWeekNumber;
};

type MonthlyCalendarConfig = {
  weekBeginsWith: DayOfWeekExpression;
};

type SampleCalendar = Month & {
  weekBeginsWith: DayOfWeekString;
  weekBeginsWithNumber: DayOfWeekNumber;
};

/**
 * Utility
 */

const getDayNumber = (day: DayOfWeekExpression): DayOfWeekNumber => {
  if (typeof day === "number") {
    return day;
  }
  switch (day) {
    case "sun":
      return 0;
    case "mon":
      return 1;
    case "tue":
      return 2;
    case "wed":
      return 3;
    case "thu":
      return 4;
    case "fri":
      return 5;
    case "sat":
      return 6;
  }
};

const getDayString = (day: DayOfWeekExpression): DayOfWeekString => {
  if (typeof day === "string") {
    return day;
  }
  switch (day) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    case 6:
      return "sat";
  }
};

const getFirstDayOfMonth = (year: number, month: number): Day => {
  const jsDate = new Date(year, month - 1, 1);
  const dayOfWeekNumber = jsDate.getDay() as DayOfWeekNumber;
  return {
    date: jsDate.getDate(),
    month,
    dayOfWeek: getDayString(dayOfWeekNumber),
    dayOfWeekNumber,
    isLastDayOfMonth: false,
  };
};
const getLastDayOfMonth = (year: number, month: number): Day => {
  const jsDate = new Date(year, month, 0);
  const dayOfWeekNumber = jsDate.getDay() as DayOfWeekNumber;

  return {
    date: jsDate.getDate(),
    month,
    dayOfWeek: getDayString(dayOfWeekNumber),
    dayOfWeekNumber,
    isLastDayOfMonth: true,
  };
};

/**
 * Main Logic
 */

const monthlyCalendarDefaultConfig: MonthlyCalendarConfig = {
  weekBeginsWith: 0,
};

const getMonthlyCalendar = (
  year: number,
  month: number,
  additionalConfig: Partial<MonthlyCalendarConfig> = monthlyCalendarDefaultConfig,
): MonthlyCalendar => {
  const firstDay = getFirstDayOfMonth(year, month);
  const lastDay = getLastDayOfMonth(year, month);
  let weekNumber = 1;
  let week: Day[] = [];
  const days: Day[] = [];
  const weeks: Week[] = [];
  const config: MonthlyCalendarConfig = {
    ...monthlyCalendarDefaultConfig,
    ...additionalConfig,
  };

  for (let date = firstDay.date; date <= lastDay.date; date++) {
    const dayNumber = ((getDayNumber(firstDay.dayOfWeek) + date - 1) %
      7) as DayOfWeekNumber;
    const day: Day = {
      month,
      date,
      dayOfWeek: getDayString(dayNumber),
      dayOfWeekNumber: dayNumber,
      isLastDayOfMonth: date === lastDay.date,
    };
    days.push(day);
    week.push(day);

    if (
      dayNumber === (getDayNumber(config.weekBeginsWith) + 6) % 7 ||
      date === lastDay.date
    ) {
      weeks.push({
        month,
        week: weekNumber,
        days: week,
      });
      week = [];
      weekNumber++;
    }
  }

  return {
    month,
    weeks,
    days,
    weekBeginsWith: getDayString(config.weekBeginsWith),
    weekBeginsWithNumber: getDayNumber(config.weekBeginsWith),
  };
};

const getSampleCalendar = (
  startDate: number,
  startDay: DayOfWeekExpression,
  amount: number,
  weekBeginsWith: DayOfWeekExpression,
): SampleCalendar => {
  const month = -1;
  let weekNumber = 1;
  let week: Day[] = [];
  const days: Day[] = [];
  const weeks: Week[] = [];

  for (let date = startDate; date < startDate + amount; date++) {
    const dayNumber = ((getDayNumber(startDay) + date - 1) %
      7) as DayOfWeekNumber;
    const day: Day = {
      month,
      date,
      dayOfWeek: getDayString(dayNumber),
      dayOfWeekNumber: dayNumber,
      isLastDayOfMonth: date === startDate + amount - 1,
    };
    days.push(day);
    week.push(day);

    if (
      dayNumber === (getDayNumber(weekBeginsWith) + 6) % 7 ||
      date === startDate + amount - 1
    ) {
      weeks.push({
        month,
        week: weekNumber,
        days: week,
      });
      week = [];
      weekNumber++;
    }
  }
  return {
    month,
    weeks,
    days,
    weekBeginsWith: getDayString(weekBeginsWith),
    weekBeginsWithNumber: getDayNumber(weekBeginsWith),
  };
};

export {
  getMonthlyCalendar,
  getSampleCalendar,
  Year,
  Month,
  Day,
  MonthlyCalendar,
  SampleCalendar,
  DayOfWeekExpression,
};
