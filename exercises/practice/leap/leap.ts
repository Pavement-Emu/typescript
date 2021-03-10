function isLeapYear(year: number) {
  const leapYear: boolean = year % 4 === 0;
  const centenary: boolean = year % 100 === 0;
  const fourthCentury: boolean = year % 400 === 0;
  return (leapYear && !centenary) || fourthCentury;
}

export default isLeapYear;
