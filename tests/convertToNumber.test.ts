import { convertToNumber, convertToNumberSoft } from "../src";

test("Convert string to number", () => {
  expect(convertToNumber("42")).toBe(42);
});

test("Convert string to number with fallback", () => {
  expect(convertToNumber("abc", 1234)).toBe(1234);
});

test("Convert string to number with force false", () => {
  expect(convertToNumberSoft("abc")).toBe("abc");
});

test("Convert array of strings to array of numbers", () => {
  expect(convertToNumber(["42", "43", "44"])).toStrictEqual([42, 43, 44]);
});

test("Convert array of strings to array of numbers with fallback", () => {
  expect(convertToNumber(["42", "abc", "44"], 1234)).toStrictEqual([
    42, 1234, 44,
  ]);
});

test("Convert array of strings to array of numbers with depply nested array", () => {
  expect(convertToNumber(["42", ["43", "44", ["abc", ["2"]]]])).toStrictEqual([
    42,
    [43, 44, [0, [2]]],
  ]);
});

test("Convert array of strings to array of numbers with depply nested array and fallback", () => {
  expect(
    convertToNumber(["42", ["43", "44", ["abc", ["2"]]], "abc"], undefined),
  ).toStrictEqual([42, [43, 44, [undefined, [2]]], undefined]);
});

test("Soft convert array of strings to array of numbers with depply nested array", () => {
  expect(
    convertToNumberSoft(["42", ["43", "44", ["abc", ["2"]]], "abc"]),
  ).toStrictEqual([42, [43, 44, ["abc", [2]]], "abc"]);
});

test("Convert object of strings to object of numbers", () => {
  expect(convertToNumber({ a: "42", b: "43", c: "44" })).toStrictEqual({
    a: 42,
    b: 43,
    c: 44,
  });
});

test("Convert object of strings to object of numbers with fallback", () => {
  expect(convertToNumber({ a: "42", b: "abc", c: "44" }, 1234)).toStrictEqual({
    a: 42,
    b: 1234,
    c: 44,
  });
});

test("Convert object of strings to object of numbers with depply nested object", () => {
  expect(
    convertToNumber({
      a: "42",
      b: { c: "43", d: "44", e: { f: "abc", g: { h: "2" } } },
    }),
  ).toStrictEqual({
    a: 42,
    b: { c: 43, d: 44, e: { f: 0, g: { h: 2 } } },
  });
});

test("Convert object of strings to object of numbers with depply nested object and fallback", () => {
  expect(
    convertToNumber(
      {
        a: "42",
        b: { c: "43", d: "44", e: { f: "abc", g: { h: "2" } } },
        f: "abc",
      },
      undefined,
    ),
  ).toStrictEqual({
    a: 42,
    b: { c: 43, d: 44, e: { f: undefined, g: { h: 2 } } },
    f: undefined,
  });
});

test("Soft convert object of strings to object of numbers with depply nested object", () => {
  expect(
    convertToNumberSoft({
      a: "42",
      b: { c: null, d: "44", e: { f: "abc", g: { h: undefined } } },
      f: "abc",
    }),
  ).toStrictEqual({
    a: 42,
    b: { c: null, d: 44, e: { f: "abc", g: { h: undefined } } },
    f: "abc",
  });
});

test("Convert combination of strings, arrays and objects to numbers", () => {
  expect(
    convertToNumber({
      a: "42",
      b: ["43", "44", "abc"],
      c: { d: "45", e: "46", f: "abc" },
    }),
  ).toStrictEqual({
    a: 42,
    b: [43, 44, 0],
    c: { d: 45, e: 46, f: 0 },
  });
});

test("Convert combination of strings, arrays and objects to numbers with fallback", () => {
  expect(
    convertToNumber(
      {
        a: "42",
        b: ["43", "44", "abc"],
        c: { d: "45", e: "46", f: "abc" },
        g: "abc",
      },
      undefined,
    ),
  ).toStrictEqual({
    a: 42,
    b: [43, 44, undefined],
    c: { d: 45, e: 46, f: undefined },
    g: undefined,
  });
});

test("Soft convert combination of strings, arrays and objects to numbers", () => {
  expect(
    convertToNumberSoft({
      a: "42",
      "123": ["43", "44", "abc"],
      c: { d: "45", e: "46", f: "abc" },
      g: "abc",
    }),
  ).toStrictEqual({
    a: 42,
    "123": [43, 44, "abc"],
    c: { d: 45, e: 46, f: "abc" },
    g: "abc",
  });
});
