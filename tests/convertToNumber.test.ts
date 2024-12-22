import convertToNumber from "../src";

test('Convert string to number', () => {
  expect(convertToNumber("42")).toBe(42);
})
