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
    return value.map((item) =>
      convertToNumberSoft(item),
    ) as ConvertToNumberSoftType<V>;
  }

  if (typeof value === "object" && value !== null) {
    const result: Record<string, any> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = convertToNumberSoft(value[key]);
      }
    }
    return result as ConvertToNumberSoftType<V>;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();

    // Preserve UUIDs
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        trimmedValue,
      )
    ) {
      return value as ConvertToNumberSoftType<V>;
    }

    // Preserve ISO date strings
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(trimmedValue)) {
      return value as ConvertToNumberSoftType<V>;
    }

    // Attempt conversion using Number
    const parsedValue = Number(trimmedValue);
    if (isNaN(parsedValue)) {
      return value as ConvertToNumberSoftType<V>;
    }

    return parsedValue as ConvertToNumberSoftType<V>;
  }

  return value as ConvertToNumberSoftType<V>;
}

export { convertToNumberSoft };
