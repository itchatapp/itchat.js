import { Permissions, PermissionString } from './Permissions.ts';
import {
  assert,
  assertEquals,
  assertNotEquals,
} from 'https://deno.land/std@0.138.0/testing/asserts.ts';

const FLAGS: PermissionString[] = ['SEND_MESSAGES', 'VIEW_CHANNEL'];

Deno.test('Permissions#toArray', () => {
  const p = new Permissions(FLAGS);
  const array = p.toArray();

  assertEquals(array.length, FLAGS.length);
  assert(FLAGS.every((f) => array.includes(f)));
});

Deno.test('Permissions#missing', () => {
  const p = new Permissions(FLAGS[0]);
  const missing = p.missing(FLAGS);

  assertEquals(missing.length, 1);
  assert(missing.every((f) => FLAGS.includes(f)));
});

Deno.test('Permissions#has', () => {
  const p = new Permissions(FLAGS);
  assert(p.has(FLAGS));
});

Deno.test('Permissions.resolve', () => {
  const p = Permissions.resolve(FLAGS);
  assertEquals(typeof p, 'bigint');
  assertNotEquals(p, 0n);
});
