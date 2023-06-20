const moment = require('moment-timezone');
const unitTestingTask = require('../unitTestingTask');

describe('unitTestingTask', () => {
  describe('Year formats', () => {
    test.each([
      ['Format YYYY returns the full year', 'YYYY', new Date('2023-08'), '2023'],
      ['Format YY returns last 2 digits of year', 'YY', new Date(2023, 7), '23']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });
  
  describe('Month formats', () => {
    test.each([
      ['Format MMMM returns full name of month', 'MMMM', new Date('2023/08/24'), 'August'],
      ['Format MMM returns short name of month', 'MMM', new Date(2023, 7, 24), 'Aug'],
      ['Format MM returns month with leading zeroes', 'MM', new Date('2023/08/24'), '08'],
      ['Format M returns month without leading zeroes', 'M', new Date(2023, 7, 24), '8']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Day formats', () => {
    test.each([
      ['Format DDD returns full name of day', 'DDD', new Date('2023/08/24'), 'Thursday'],
      ['Format DD returns short name of day', 'DD', new Date(2023, 7, 24), 'Thu'],
      ['Format D returns min name of day', 'D', new Date(2023, 7, 24), 'Th'],
      ['Format dd returns day with leading zeroes', 'dd', new Date('2023/8/4'), '04'],
      ['Format d returns day without leading zeroes', 'd', new Date(2023, 7, 4), '4']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Hour formats', () => {
    test.each([
      ['Format HH returns hour in 24-hour clock with leading zeroes', 'HH', new Date('2023/8/4 4:00'), '04'],
      ['Format H returns hour in 24-hour clock without leading zeroes', 'H', new Date(2023, 7, 4, 4), '4'],
      ['Format hh returns hour with leading zeroes in 12-hr format', 'hh', new Date('2023/8/4 18:00'), '06'],
      ['Format hh returns 12 without leading zeroes', 'hh', new Date('2023/8/4 12:00'), '12'],
      ['Format h returns hour without leading zeroes in 12-hr format', 'h', new Date(2023, 7, 4, 12), '12']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Minute formats', () => {
    test.each([
      ['Format mm returns minutes with leading zeroes', 'mm', new Date('2023/8/24 4:7'), '07'],
      ['Format m returns minutes without leading zeroes', 'm', new Date(2023, 7, 4, 4, 7), '7']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Second formats', () => {
    test.each([
      ['Format ss returns seconds with leading zeroes', 'ss', new Date('2023/8/24 4:7:5'), '05'],
      ['Format s returns seconds without leading zeroes', 's', new Date(2023, 7, 4, 4, 7, 5), '5']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Milliseconds formats', () => {
    test.each([
      ['Format ff returns milliseconds with leading zeroes', 'ff', new Date('2023/8/24 4:7:5.1'), '100'],
      ['Format f returns milliseconds without leading zeroes', 'f', new Date(2023, 7, 4, 4, 7, 5, 10), '10']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('AM/PM formats', () => {
    test.each([
      ['Format A returns AM in uppercase', 'A', new Date('2023/8/24 4:7:5'), 'AM'],
      ['Format a returns AM in lowercase', 'a', new Date(2023, 7, 4, 11, 7, 5), 'am'],
      ['Format A returns PM in uppercase', 'A', new Date('2023/8/24 13:7:5'), 'PM'],
      ['Format a returns PM in lowercase', 'a', new Date(2023, 7, 4, 13, 7, 5), 'pm']
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Timezone formats', () => {
    const date = moment.tz('2023/8/24 4:7:5', 'America/Los_Angeles');
    const timezoneOffset = moment(date).utcOffset(moment().utcOffset()).format('Z');

    test.each([
      ['Format Z returns timezone offset with colon', 'Z', date.toDate(), timezoneOffset],
      ['Format ZZ returns timezone offset without colon', 'ZZ', new Date(2023, 7, 4, 16, 7, 5), timezoneOffset.replace(':', '')]
    ])('%s', (description, format, date, expected) => {
      const formattedDate = unitTestingTask(format, date);
      expect(formattedDate).toBe(expected);
    });
  });

  describe('Error cases', () => {
    test.each([
      ['should throw TypeError if format argument is not a string', 123],
      ['should throw TypeError if date argument is not a valid type', true]
    ])('%s', (description, arg) => {
      expect(() => {
        unitTestingTask(arg);
      }).toThrow(TypeError);
    });
  });

  describe('Formatting logic', () => {
    test('should call the corresponding formatter if it exists', () => {
      const format = 'YYYY';
      const dt = new Date();
      unitTestingTask._formatters = {
        YYYY: jest.fn().mockReturnValue('2023'),
      };

      const result = unitTestingTask(format, dt);

      expect(unitTestingTask._formatters[format]).toHaveBeenCalledWith(dt);
      expect(result).toBe('2023');
    });
  });

  describe('Date assignment', () => {
    const currentDate = new Date();
    const expectedYear = currentDate.getFullYear().toString();
    const invalidDate = '2023-06-01T10:00:00Z';
    test.each([
      ['should assign current date when no arguments are provided', 'YYYY', expectedYear],
      ['should assign current date when only one argument is provided and it is not a valid date', ('YYYY', invalidDate), expectedYear]
    ])('%s', (description, format, expected) => {
      const result = unitTestingTask(format);
      expect(result).toContain(expected);
    });
  });

  describe('Language functions', () => {
    jest.mock('../lang/ru', () => {});
    jest.mock('../lang/be', () =>
      jest.requireActual('../lang/nonexistent_module')
    );

    beforeEach(() => {
      unitTestingTask.lang('en');
    });

    test.each([
      ['should return current language when no arguments are provided', undefined, 'en'],
      ['should return current language when no options are provided', 'ru', 'ru'],
      ['should handle error when loading language module for Belarusian (be)', 'be', 'en']
    ])('%s', (description, lang, expected) => {
      expect(unitTestingTask.lang(lang)).toBe(expected);
    });
  });
});
