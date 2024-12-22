export default function convertToNumber<T = number>(
  value: any,
  fallback?: T,
): number | T {
  // If fallback is not provided, default to 0
  const fallbackValue = (arguments.length < 2 ? 0 : fallback) as number | T;

  if (typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    // Recursively handle array nesting
    for (const item of value) {
      const result = convertToNumber(item, fallbackValue);
      if (typeof result === "number") {
        return result;
      }
    }
    return fallbackValue;
  }

  if (typeof value === "object" && value !== null && value !== undefined) {
    // Recursively handle nested objects
    for (const key in value) {
      if (Object.hasOwn(value, key)) {
        const result = convertToNumber(value[key], fallbackValue);
        if (typeof result === "number") {
          return result;
        }
      }
    }
    return fallbackValue;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (!trimmedValue || isNaN(Number(trimmedValue))) {
      return fallbackValue;
    }
    return parseFloat(trimmedValue);
  }

  return fallbackValue;
}

export { convertToNumber };
