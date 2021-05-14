/**
 * Add an item if not found in an array or remove it if found.
 * Returns new array
 * @param array array - array to search
 * @param item - item to add
 * @returns new array with or without item
 */
export const reducer = (array: unknown[], item: unknown): unknown[] => {
  const index = array.indexOf(item);
  if (index < 0) {
    return insertItem(array, { item, index: 0 });
  } else {
    return removeItem(array, { index });
  }
};

function insertItem(
  array: unknown[],
  action: { index: number; item: unknown }
) {
  const newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

function removeItem(array: unknown[], action: { index: number }) {
  return array.filter((_item, index) => index !== action.index);
}
