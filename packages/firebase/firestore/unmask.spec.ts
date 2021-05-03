import test from 'ava';

import { unmaskCollection } from './unmask-collection';

test('can unmask an object', async (t) => {
  const keys = { a: 'a_long', b: 'b_long' };
  const original = { one: { a: '1', b: '2' } };
  const unmasked = { one: { a_long: '1', b_long: '2' } };
  const actual = unmaskCollection(keys, original);
  t.deepEqual(actual, unmasked);
});
