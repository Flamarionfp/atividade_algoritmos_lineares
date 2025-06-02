export type AlgorithmFunction = (arr: number[]) => number[];

export type BenchmarkResult = {
  n: number;
  quickSort: number;
  mergeSort: number;
  heapSort: number;
  countingSort: number;
  radixSort: number;
  bucketSort: number;
};
