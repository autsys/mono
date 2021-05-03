export function getKeyByValue(
  object: Record<string, unknown>,
  value: string
): string {
  const found = Object.keys(object).find((key) => object[key] === value);
  if (!found) {
    console.error(`${value} not found in mask values - update keys!`);
    return value;
  }
  return found;
}
