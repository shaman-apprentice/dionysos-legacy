import { formatDate, parseDate } from './dateHelper';

describe('`parseDate`', () => {
  it('throws error if date has not the form of "dd/mm/yyyy"', () => {
    const errorMsg = 'date must have the form dd/mm/yyyy';
    expect(() => parseDate('2h/20/2001')).toThrow(errorMsg);
    expect(() => parseDate('2/20/2001')).toThrow(errorMsg);
  });

  it('parses into correct number', () => {
    const startOfDay = 1597276800000;
    const endOfDay =   1597363199999;
    const parsedDate = parseDate('13/08/2020');
    expect(parsedDate).toBeGreaterThanOrEqual(startOfDay);
    expect(parsedDate).toBeLessThanOrEqual(endOfDay);
  });
});

describe('`formatDate`', () => {
  it('adds a "0" in front of single digit day and month', () => {
    const date = new Date('2020-01-02').getTime();
    expect(formatDate(date)).toBe('02/01/2020');
  });
});

describe('`parseDate` and `formateDate` revert each other', () => {
  test('`parseDate` reverts `formateDate`', () => {
    const date = new Date().getTime();
    expect(parseDate(formatDate(date))).toBe(date);
  });

  test('`formateDate` reverts `parseDate`', () => {
    const date = '01/05/2020';
    expect(formatDate(parseDate(date))).toBe(date);
  });
});
