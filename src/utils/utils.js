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

export function removeSpaceAndSpecialCharacters(str) {
  return str
    .replace(/\s/g, '')
    .replace(/[^\w\s]/gi, '')
    .toLowerCase();
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
