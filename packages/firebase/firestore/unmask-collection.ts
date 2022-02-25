import renameKeys from "./rename-keys";
/**
 * Unmask an object with short keys to full keys
 * Used to store data with minimal key (1 char)
 * and program with human readable
 * @param keys - keys to use for switching {current:new}
 * @param data - object of data objects (docs) to transform
 * @returns same objects with full keys
 */
export function unmaskCollection<T extends Record<string, unknown>>(
  keys: Record<string, string>,
  data: Record<string, Record<string, unknown>>
): Record<string, T> {
  const object = Object.keys(data).map((id: string) => {
    const doc = data[id];
    const rekeyed = renameKeys(doc, keys);
    return Object.assign({}, { [id]: { ...rekeyed } });
  });
  const combined = Object.assign({}, ...object);
  return combined;
}
