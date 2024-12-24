type ConvertToNumberType<V, T> = V extends number
  ? number | T
  : V extends string
    ? number | T
    : V extends (infer U)[]
      ? ConvertToNumberType<U, T>[]
      : V extends object
        ? { [K in keyof V]: ConvertToNumberType<V[K], T> }
        : V;

function convertToNumber<V, T = number>(
  value: V,
  fallback?: T,
): ConvertToNumberType<V, T> {
  const fallbackValue = (arguments.length < 2 ? 0 : fallback) as number | T;

  if (typeof value === "number") {
    return (isNaN(value) ? fallbackValue : value) as ConvertToNumberType<V, T>;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    const parsedValue = Number(trimmedValue);

    if (!trimmedValue || isNaN(parsedValue)) {
      return fallbackValue as ConvertToNumberType<V, T>;
    }
    return parsedValue as ConvertToNumberType<V, T>;
  }

  if (Array.isArray(value)) {
    // Recursively handle array nesting
    return value.map((item) =>
      convertToNumber(item, fallbackValue),
    ) as ConvertToNumberType<V, T>;
  }

  if (typeof value === "object" && value !== null) {
    // Recursively handle nested objects
    const result: Record<string, any> = {};
    for (const key in value) {
      if (Object.hasOwn(value, key)) {
        result[key] = convertToNumber(value[key], fallbackValue);
      }
    }
    return result as ConvertToNumberType<V, T>;
  }

  // For other types, return the fallbackValue
  return fallbackValue as ConvertToNumberType<V, T>;
}

export { convertToNumber };
