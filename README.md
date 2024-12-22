# @alfarizi/convert-to-number

`convert-to-number` is a lightweight utility package for JavaScript and
TypeScript that converts any value into a number. It provides robust handling
for various types such as strings, arrays, objects, and primitives, with support
for fallback values when conversion is not possible.

## Installation

Install the package via npm or yarn:

```bash
npm install convert-to-number
```

or

```bash
yarn add convert-to-number
```

## Usage

Import the `convertToNumber` function and use it in your project:

### Basic Example

```typescript
import convertToNumber from "convert-to-number";

// Convert a string to a number
console.log(convertToNumber("123")); // Output: 123

// Convert a non-numeric string with a fallback
console.log(convertToNumber("abc", -1)); // Output: -1

// Fallback to default value (0)
console.log(convertToNumber(undefined)); // Output: 0
```

### TypeScript Support

The function is fully typed, with an optional generic type parameter `T` for
specifying the fallback value type:

```typescript
const result: number | string = convertToNumber("abc", "fallback");
console.log(result); // Output: 'fallback'
```

## API

### `convertToNumber<T = number>(value: any, fallback?: T): number | T`

#### Parameters

- `value` (any): The value to be converted to a number. It can be of any type,
  including primitives, strings, arrays, or objects.
- `fallback` (T, optional): The fallback value to return if conversion is not
  possible. Defaults to `0` if not provided.

#### Returns

- `number | T`: The converted number or the fallback value.

## Features

- **Handles Various Types:**

  - Strings: Converts numeric strings to numbers, ignoring non-numeric strings.
  - Arrays: Returns the first numeric value found in the array.
  - Objects: Converts the first numeric value from its properties.
  - Primitives: Directly converts numbers or defaults to the fallback value.

- **TypeScript Support:** Fully typed for safer and predictable usage.

- **Customizable Fallback:** Define a fallback value for unsupported
  conversions.

## Edge Cases

- **Empty Strings:** Treated as invalid and return the fallback value.
- **Nested Arrays/Objects:** Recursively processes arrays and objects to find a
  valid numeric value.
- **Invalid Values:** Non-numeric strings, `null`, or `undefined` default to the
  fallback value.

## Examples

### Array Handling

```typescript
console.log(convertToNumber(["x", "y", 42], -1)); // Output: 42
console.log(convertToNumber([], 0)); // Output: 0
```

### Object Handling

```typescript
console.log(convertToNumber({ a: "10", b: "invalid" }, -1)); // Output: 10
console.log(convertToNumber({}, -1)); // Output: -1
```

### Nested Structures

```typescript
console.log(convertToNumber({ a: ["x", { b: "100" }] }, 0)); // Output: 100
```

## License

`convert-to-number` is licensed under the MIT License. See the
[LICENSE](LICENSE) file for details.

---

Happy coding!
