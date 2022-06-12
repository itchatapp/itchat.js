import { Badges, BadgeString } from './Badges.ts';
import {
  assert,
  assertEquals,
  assertNotEquals,
} from 'https://deno.land/std@0.138.0/testing/asserts.ts';

const FLAGS: BadgeString[] = ['STAFF', 'DEVELOPER'];

Deno.test('Badges#toArray', () => {
  const p = new Badges(FLAGS);
  const array = p.toArray();

  assertEquals(array.length, FLAGS.length);
  assert(FLAGS.every((f) => array.includes(f)));
});

Deno.test('Badges#missing', () => {
  const p = new Badges(FLAGS[0]);
  const missing = p.missing(FLAGS);

  assertEquals(missing.length, 1);
  assert(missing.every((f) => FLAGS.includes(f)));
});

Deno.test('Badges#has', () => {
  const p = new Badges(FLAGS);
  assert(p.has(FLAGS));
});

Deno.test('Badges.resolve', () => {
  const p = Badges.resolve(FLAGS);
  assertEquals(typeof p, 'bigint');
  assertNotEquals(p, 0n);
});
