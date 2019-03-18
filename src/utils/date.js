/**
 * rounds a date-object
 * @param  {Date} d  A date object.
 * @return {Date}  The date object (rounded time components).
 */
export function roundDate(d) {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

/**
 * generates a date-object (rounded time-components) from a given date-string
 * @param  {string|Date} s A date string/object.
 * @return {Date}   The date object (rounded time components).
 */
export function fromDate(s) {
  let d = new Date(s);
  if (isNaN(d)) {
    throw new Error(`Invalid Date: '${s}' is not in a valid date-format.`);
  }
  return roundDate(d);
}

/**
 * Add a number of days to a date.
 * @param  {Date} d The date.
 * @param  {number} days The days to add.
 * @return {Date} A resulting new date.
 */
export function addDay(d, days) {
  let res = new Date(d);
  res.setDate(res.getDate() + days);
  return res;
}
