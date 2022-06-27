declare const process: { pid: number };
declare const Deno: { pid: number };

const pid = typeof Deno !== 'undefined'
  ? Deno.pid
  : typeof process !== 'undefined'
  ? process.pid
  : 0;

export class Snowflake extends null {
  static readonly EPOCH = new Date('2021-01-01').getTime();
  static INCREMENT = 0n;
  static processId = BigInt(pid % 31);
  static workerId = BigInt((/*FIXME: cluster.worker?.id ||*/ 0) % 31);

  static generate(now = Date.now()): string {
    if (this.INCREMENT >= 4095n) this.INCREMENT = 0n;
    const time = BigInt(now - this.EPOCH) << 22n;
    const workerId = this.workerId << 17n;
    const processId = this.processId << 12n;
    const increment = this.INCREMENT++;
    return (time | workerId | processId | increment).toString();
  }

  static timestampOf(id: string): number {
    return Number(BigInt(id) >> 22n) + Snowflake.EPOCH;
  }
}
