export function generateRandomArray(n: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * n) + 1);
}
