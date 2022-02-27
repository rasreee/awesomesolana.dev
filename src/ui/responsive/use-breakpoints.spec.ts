import { isValidEmString } from './helpers';

/**
 * @group hooks
 * @group unit
 */
describe('isValidEmString', () => {
  it('returns true given decimal number', () => {
    expect(isValidEmString('7')).toBeTruthy();
    expect(isValidEmString('7.0')).toBeTruthy();
    expect(isValidEmString('7.03')).toBeTruthy();
    expect(isValidEmString('7.')).toBeTruthy();
  });

  it('returns true given valid em string', () => {
    expect(isValidEmString('7em')).toBeTruthy();
    expect(isValidEmString('7.0em')).toBeTruthy();
    expect(isValidEmString('7.07em')).toBeTruthy();
  });

  it('returns true given invalid value', () => {
    expect(isValidEmString('7e')).toBeFalsy();
    expect(isValidEmString('7emm')).toBeFalsy();
    expect(isValidEmString('ee7.')).toBeFalsy();
  });
});
