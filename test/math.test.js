const { add, multiply } = require('../index');

describe('Math Functions', () => {
  test('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should multiply two numbers correctly', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});
