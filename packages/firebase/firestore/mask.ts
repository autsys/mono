import { getKeyByValue } from './get-key-by-value';
/**
 * Mask an object for storage in Firestore
 * Reduces the key length to save on space
 * @param newKeys - {shortKey:longKey}
 * @param object - object to mask
 * @returns masked object - reduced keys in length
 */
export function mask(
  newKeys: Record<string, string>,
  object: Record<string, unknown>
): Record<string, unknown> {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const entries = keys.map((key, i) => {
    const newKey = getKeyByValue(newKeys, key);
    return { [newKey]: values[i] };
  });
  const rekeyed = Object.assign({}, ...entries);
  return rekeyed;
}
