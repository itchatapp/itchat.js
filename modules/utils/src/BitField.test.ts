import { BitField } from './BitField.ts';
import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.138.0/testing/asserts.ts';

const BIT = 1n << 1n;
const OTHER_BITS = 1n << 2n;

Deno.test('BitField#set', () => {
  const bits = new BitField();

  bits.set(BIT);

  assertEquals(bits.bitfield, BIT);
});

Deno.test('BitField#has', () => {
  const bits = new BitField(BIT);

  assert(bits.has(BIT));
  assert(!bits.has(OTHER_BITS));
});

Deno.test('BitField#add', () => {
  const bits = new BitField();

  bits.add(BIT);
  bits.add(OTHER_BITS);

  assert(bits.has(BIT));
  assert(bits.has(OTHER_BITS));
  assert(!bits.has(12312n));
});

Deno.test('BitField#remove', () => {
  const bits = new BitField(BIT);

  bits.remove(BIT);
  bits.add(OTHER_BITS);

  assert(!bits.has(BIT));
  assert(bits.has(OTHER_BITS));
});

Deno.test('BitField#equals', () => {
  const bits = new BitField(BIT);
  assert(bits.equals(BIT));
});

Deno.test('BitField#valueOf', () => {
  const bits = new BitField(BIT);
  assertEquals(bits.valueOf(), BIT);
});

Deno.test('BitField#freeze', () => {
  const bits = new BitField(BIT);

  bits.freeze();

  const other = bits.add(OTHER_BITS);

  assert(bits !== other);
});

Deno.test('BitField#any', () => {
  const bits = new BitField();

  const NOT_ADDED_BITS = OTHER_BITS;

  bits.add(BIT);

  assert(bits.any([BIT, NOT_ADDED_BITS]));
});
