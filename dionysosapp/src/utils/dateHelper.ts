const validDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const parseDate = (date: string) => {
  if (!validDateRegex.test(date))
    throw new Error('date must have the form dd/mm/yyyy');

  const [day, month, year] = date.split('/');
  const jsDate = new Date();
  jsDate.setUTCDate(Number(day));
  jsDate.setUTCMonth(Number(month) - 1); // first month is 0 in js date UTC
  jsDate.setUTCFullYear(Number(year));
  return jsDate.getTime();
}

export const formatDate = (date: number) => {
  const jsDate = new Date(date);

  let day = jsDate.getUTCDate();
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  let month = jsDate.getUTCMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  let year = jsDate.getFullYear();

  return `${formattedDay}/${formattedMonth}/${year}`;
}
