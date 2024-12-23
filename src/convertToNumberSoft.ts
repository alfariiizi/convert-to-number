type ConvertToNumberSoftType<V> = V extends number
  ? number
  : V extends string
    ? number | string
    : V extends (infer U)[]
      ? ConvertToNumberSoftType<U>[]
      : V extends object
        ? { [K in keyof V]: ConvertToNumberSoftType<V[K]> }
        : V;

function convertToNumberSoft<V>(value: V): ConvertToNumberSoftType<V> {
  if (typeof value === "number") {
    return value as ConvertToNumberSoftType<V>;
  }

  if (Array.isArray(value)) {
    // Recursively handle array nesting
    return value.map((item) =>
      convertToNumberSoft(item),
    ) as ConvertToNumberSoftType<V>;
  }

  if (typeof value === "object" && value !== null) {
    // Recursively handle nested objects
    const result: Record<string, any> = {};
    for (const key in value) {
      if (Object.hasOwn(value, key)) {
        result[key] = convertToNumberSoft(value[key]);
      }
    }
    return result as ConvertToNumberSoftType<V>;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    const parsedValue = parseFloat(trimmedValue);

    if (!trimmedValue || isNaN(parsedValue)) {
      return value as ConvertToNumberSoftType<V>;
    }
    return parsedValue as ConvertToNumberSoftType<V>;
  }

  // For other types, return the original value
  return value as ConvertToNumberSoftType<V>;
}

export { convertToNumberSoft };
