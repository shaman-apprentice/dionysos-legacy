const validDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

export const parseDate = (date: string) => {
  if (!validDateRegex.test(date))
    throw new Error('date must have the form dd/mm/yyyy');

  const [day, month, year] = date.split('/');
  const parsedDate = new Date();
  parsedDate.setUTCDate(Number(day));
  parsedDate.setUTCMonth(Number(month) - 1); // first month is 0 in js date UTC
  parsedDate.setUTCFullYear(Number(year));
  return parsedDate.getTime();
}

export const formatDate = (date: number) => {
  const parsedDate = new Date(date);

  let day = parsedDate.getUTCDate();
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  let month = parsedDate.getUTCMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  let year = parsedDate.getFullYear();

  return `${formattedDay}/${formattedMonth}/${year}`;
}
