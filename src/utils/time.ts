import { AlgorithmFunction } from "../types";

export function measureAverageTime(
  algorithm: AlgorithmFunction,
  arr: number[],
  runs: number
): number {
  let totalTime = 0;
  const arrCopy = [...arr];

  for (let i = 0; i < runs; i++) {
    const copy = [...arrCopy];
    const start = performance.now();
    algorithm(copy);
    const end = performance.now();
    totalTime += end - start;
  }

  return totalTime / runs;
}
