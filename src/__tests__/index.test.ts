import { generateRegex } from '../index';
test('Generate Password', () => {
  expect(generateRegex()).toBe('^(?=.*[a-z]{1,})(?=.*[A-Z]{1,})(?=.*\d{1,})(?=.*[@$!%*?&]{1,})[A-Za-z\d@$!%*?&]{8,}$');
});