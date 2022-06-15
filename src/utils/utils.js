export const checkIfObjectIsEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

export function browserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }
  return browserName;
}

// convert mongoose date to format dd/mm/yyyy 00:00

export function convertDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/') + ' ' + [hours, minutes].join(':');
}

// 2022-06-25T15:00:00.000Z" does not conform to the required format.  The format is "yyyy-MM-ddThh:mm

export function convertDateToMongoose(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = '' + d.getHours(),
    minutes = '' + d.getMinutes();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;

  return [year, month, day].join('-') + 'T' + [hours, minutes].join(':');
}

// uppercase first letter
export function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// countdown
export function countdown(date) {
  let countDownDate = new Date(date).getTime();
  let x = setInterval(() => {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(x);
      return 'EXPIRED';
    }
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
  }, 1000);
}

// convert date to format dd/mm/yyyy hh:mm
export function convertDateToFormat(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/') + ' ' + [hours, minutes].join(':');
}

// sum all values in an array
export function sumArray(array) {
  return array.reduce((a, b) => a + b, 0);
}

// check if game is today
export function isToday(date) {
  let d = new Date(date);
  let today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 *
 * @param {Date} date1 Game date
 * @param {Date} date2 Bet date
 * @returns
 */
// compare date, return true if game date is after bet date
export function compareDate(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2);

  return d2 > d1;
}
