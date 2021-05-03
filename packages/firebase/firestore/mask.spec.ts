import test from 'ava';

import { mask } from './mask';

test('can mask an object', async (t) => {
  const keys = { a: 'a_long', b: 'b_long' };
  const original = { a_long: '1', b_long: '2' };
  const masked = { a: '1', b: '2' };
  const actual = mask(keys, original);
  t.deepEqual(actual, masked);
});
