const unitTestingTask = require('../unitTestingTask');

describe('unitTestingTask', () => {
  describe('Year formats', () => {
    test('Format YYYY returns the full year', () => {
      const formattedDate = unitTestingTask('YYYY', new Date('2023-08'));
      expect(formattedDate).toBe('2023');
    });

    test('Format YY returns last 2 digits of year', () => {
      const formattedDate = unitTestingTask('YY', new Date(2023, 7));
      expect(formattedDate).toBe('23');
    });
  });

  describe('Month formats', () => {
    test('Format MMMM returns full name of month', () => {
      const formattedDate = unitTestingTask('MMMM', new Date('2023/08/24'));
      expect(formattedDate).toBe('August');
    });

    test('Format MMM returns short name of month', () => {
      const formattedDate = unitTestingTask('MMM', new Date(2023, 7, 24));
      expect(formattedDate).toBe('Aug');
    });

    test('Format MM returns month with leading zeroes', () => {
      const formattedDate = unitTestingTask('MM', new Date('2023/08/24'));
      expect(formattedDate).toBe('08');
    });

    test('Format M returns month without leading zeroes', () => {
      const formattedDate = unitTestingTask('M', new Date(2023, 7, 24));
      expect(formattedDate).toBe('8');
    });
  });

  describe('Day formats', () => {
    test('Format DDD returns full name of day', () => {
      const formattedDate = unitTestingTask('DDD', new Date('2023/08/24'));
      expect(formattedDate).toBe('Thursday');
    });

    test('Format DD returns short name of day', () => {
      const formattedDate = unitTestingTask('DD', new Date(2023, 7, 24));
      expect(formattedDate).toBe('Thu');
    });

    test('Format D returns min name of day', () => {
      const formattedDate = unitTestingTask('D', new Date(2023, 7, 24));
      expect(formattedDate).toBe('Th');
    });

    test('Format dd returns day with leading zeroes', () => {
      const formattedDate = unitTestingTask('dd', new Date('2023/8/4'));
      expect(formattedDate).toBe('04');
    });

    test('Format d returns day without leading zeroes', () => {
      const formattedDate = unitTestingTask('d', new Date(2023, 7, 4));
      expect(formattedDate).toBe('4');
    });
  });

  describe('Hour formats', () => {
    test('Format HH returns hour in 24-hour clock with leading zeroes', () => {
      const formattedDate = unitTestingTask('HH', new Date('2023/8/4 4:00'));
      expect(formattedDate).toBe('04');
    });

    test('Format H returns hour in 24-hour clock without leading zeroes', () => {
      const formattedDate = unitTestingTask('H', new Date(2023, 7, 4, 4));
      expect(formattedDate).toBe('4');
    });

    test('Format hh returns hour with leading zeroes in 12-hr format', () => {
      const formattedDate = unitTestingTask('hh', new Date('2023/8/4 18:00'));
      expect(formattedDate).toBe('06');
    });

    test('Format hh returns 12 without leading zeroes', () => {
      const formattedDate = unitTestingTask('hh', new Date('2023/8/4 12:00'));
      expect(formattedDate).toBe('12');
    });

    test('Format h returns hour without leading zeroes in 12-hr format', () => {
      const formattedDate = unitTestingTask('h', new Date(2023, 7, 4, 12));
      expect(formattedDate).toBe('12');
    });
  });

  describe('Minute formats', () => {
    test('Format mm returns minutes with leading zeroes', () => {
      const formattedDate = unitTestingTask('mm', new Date('2023/8/24 4:7'));
      expect(formattedDate).toBe('07');
    });

    test('Format m returns minutes without leading zeroes', () => {
      const formattedDate = unitTestingTask('m', new Date(2023, 7, 4, 4, 7));
      expect(formattedDate).toBe('7');
    });
  });

  describe('Second formats', () => {
    test('Format ss returns seconds with leading zeroes', () => {
      const formattedDate = unitTestingTask('ss', new Date('2023/8/24 4:7:5'));
      expect(formattedDate).toBe('05');
    });

    test('Format s returns seconds without leading zeroes', () => {
      const formattedDate = unitTestingTask('s', new Date(2023, 7, 4, 4, 7, 5));
      expect(formattedDate).toBe('5');
    });
  });

  describe('Milliseconds formats', () => {
    test('Format ff returns milliseconds with leading zeroes', () => {
      const formattedDate = unitTestingTask(
        'ff',
        new Date('2023/8/24 4:7:5.1')
      );
      expect(formattedDate).toBe('100');
    });

    test('Format f returns milliseconds without leading zeroes', () => {
      const formattedDate = unitTestingTask(
        'f',
        new Date(2023, 7, 4, 4, 7, 5, 10)
      );
      expect(formattedDate).toBe('10');
    });
  });

  describe('AM/PM formats', () => {
    test('Format A returns AM in uppercase', () => {
      const formattedDate = unitTestingTask('A', new Date('2023/8/24 4:7:5'));
      expect(formattedDate).toBe('AM');
    });

    test('Format a returns AM in lowercase', () => {
      const formattedDate = unitTestingTask(
        'a',
        new Date(2023, 7, 4, 11, 7, 5)
      );
      expect(formattedDate).toBe('am');
    });

    test('Format A returns PM in uppercase', () => {
      const formattedDate = unitTestingTask('A', new Date('2023/8/24 13:7:5'));
      expect(formattedDate).toBe('PM');
    });

    test('Format a returns PM in lowercase', () => {
      const formattedDate = unitTestingTask(
        'a',
        new Date(2023, 7, 4, 13, 7, 5)
      );
      expect(formattedDate).toBe('pm');
    });
  });

  describe('Timezone formats', () => {
    test('Format Z returns timezone offset with colon', () => {
      const formattedDate = unitTestingTask('Z', new Date('2023/8/24 4:7:5'));
      expect(formattedDate).toBe('-05:00');
    });

    test('Format ZZ returns timezone offset without colon', () => {
      const formattedDate = unitTestingTask(
        'ZZ',
        new Date(2023, 7, 4, 16, 7, 5)
      );
      expect(formattedDate).toBe('-0500');
    });
  });

  describe('Error cases', () => {
    test('should throw TypeError if format argument is not a string', () => {
      expect(() => {
        unitTestingTask(123);
      }).toThrow(TypeError);
    });

    test('should throw TypeError if date argument is not a valid type', () => {
      expect(() => {
        unitTestingTask('YYYY-MM-DD', true);
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
    test('should assign current date when no arguments are provided', () => {
      const result = unitTestingTask('YYYY');
      const currentDate = new Date();
      const expectedYear = currentDate.getFullYear().toString();

      expect(result).toContain(expectedYear);
    });

    test('should assign current date when only one argument is provided and it is not a valid date', () => {
      const invalidDate = '2023-06-01T10:00:00Z';
      const result = unitTestingTask('YYYY', invalidDate);
      const currentDate = new Date();
      const expectedYear = currentDate.getFullYear().toString();

      expect(result).toContain(expectedYear);
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

    test('should be "en" by default', () => {
      expect(unitTestingTask.lang()).toBe('en');
    });

    test('should update current language when lang is provided and no options are provided', () => {
      expect(unitTestingTask.lang('ru')).toBe('ru');
    });

    test('should handle error when loading language module for Belarusian (be)', () => {
      expect(unitTestingTask.lang('be')).toBe('en');
    });
  });
});
