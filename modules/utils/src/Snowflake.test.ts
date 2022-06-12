import { Snowflake } from './Snowflake.ts';
import { assertEquals } from 'https://deno.land/std@0.138.0/testing/asserts.ts';

Deno.test('Snowflake#generate', () => {
  assertEquals(typeof Snowflake.generate(), 'bigint');
});

Deno.test('Snowflake#generate with specific date', () => {
  const timestamp = Date.now();
  const id = Snowflake.generate(timestamp);
  assertEquals(Snowflake.timestampOf(id), timestamp);
});

Deno.test('Snowflake#timestampOf', () => {
  const timestamp = Date.now();
  const id = Snowflake.generate(timestamp);
  assertEquals(Snowflake.timestampOf(id), timestamp);
});
