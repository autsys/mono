/**
 * Rename an object property using an object of keys
 * @example
 * const obj = { a: "1", b: "2" };
 * const renamedObj = renameKeys(obj, newKeys);
 * const newKeys = { a: "A", c: "C" };
 * console.log(renamedObj);
 * // {A:"1", b:"2"}
 * @param obj - object to rename properties
 * @param newKeys - new keys to use for renaming
 * @returns - object with renamed properties
 */
export default function renameKeys(
  obj: Record<string, unknown>,
  newKeys: Record<string, string>
): Record<string, unknown> {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}
