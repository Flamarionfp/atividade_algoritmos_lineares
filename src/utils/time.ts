import { performance } from "perf_hooks";

export function measureAverageTime(
  algorithm: (arr: number[]) => number[] | void,
  generator: () => number[],
  runs: number
): number {
  const times: number[] = [];

  for (let i = 0; i < runs; i++) {
    const input = generator();
    const start = performance.now();
    algorithm([...input]);
    const end = performance.now();
    times.push(end - start);
  }

  const avg = times.reduce((acc, time) => acc + time, 0) / times.length;

  return avg;
}
