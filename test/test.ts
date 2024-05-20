import userState from '../src/states/UserState';
describe('getCookie', () => {
  test('getCookie should return value of cookie according to name', () => {
    const cookieStr = 'userName=Adam; refreshToken=refreshTokenValue; someCookie=someCookieValue';
    const name = 'refreshToken';
    const result = 'refreshTokenValue';

    const getCookieSpy = jest.spyOn(userState, 'getCookie').mockImplementation((name: string) => {
      const cookie = cookieStr.split('; ').find((el) => el.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    });

    expect(userState.getCookie(name)).toBe(result);
  });
});

import { CheckAge } from '../src/utils/checkAge';
describe('CheckAge', () => {
  const testData: { dataStr: string; expectedResult: boolean }[] = [
    { dataStr: '01.11.1995', expectedResult: true },
    { dataStr: '35.03.1984', expectedResult: false },
    { dataStr: '06.08.1830', expectedResult: false },
    { dataStr: '25.10.2020', expectedResult: false },
    { dataStr: '18.05.2030', expectedResult: false },
  ];

  test.each(testData)(
    'should check right format of the date, the age should be greater than 13',
    ({ dataStr, expectedResult }) => {
      expect(CheckAge(dataStr)).toBe(expectedResult);
    },
  );
});