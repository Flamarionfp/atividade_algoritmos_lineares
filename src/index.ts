import fs from "fs";
import path from "path";
import * as algorithms from "./algorithms";
import { BenchmarkResult } from "./types";
import { generateRandomArray } from "./utils/array";
import { measureAverageTime } from "./utils/time";

const MIN_N = 10;
const MAX_N = 50000;
const STEP = 1000;
const RUNS_PER_ALGORITHM = 20;

async function runBenchmarks(): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  for (let n = MIN_N; n <= MAX_N; n += STEP) {
    console.log(`Testando com n = ${n}...`);
    const arr = generateRandomArray(n);

    const result: Partial<BenchmarkResult> = { n };

    result.quickSort = measureAverageTime(
      algorithms.quickSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    result.mergeSort = measureAverageTime(
      algorithms.mergeSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    result.heapSort = measureAverageTime(
      algorithms.heapSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    result.countingSort = measureAverageTime(
      algorithms.countingSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    result.radixSort = measureAverageTime(
      algorithms.radixSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    result.bucketSort = measureAverageTime(
      algorithms.bucketSort,
      arr,
      RUNS_PER_ALGORITHM
    );

    console.log(`QuickSort: ${result.quickSort.toFixed(4)} ms \n`);
    console.log(`MergeSort: ${result.mergeSort.toFixed(4)} ms \n`);
    console.log(`HeapSort: ${result.heapSort.toFixed(4)} ms`);
    console.log(`CountingSort: ${result.countingSort.toFixed(4)} ms \n`);
    console.log(`RadixSort: ${result.radixSort.toFixed(4)} ms \n`);
    console.log(`BucketSort: ${result.bucketSort.toFixed(4)} ms \n`);

    results.push(result as BenchmarkResult);
  }

  saveResultsToCSV(results);

  return results;
}

function saveResultsToCSV(results: BenchmarkResult[]) {
  const dir = path.join(__dirname, "data");
  const csvPath = path.join(dir, "results.csv");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const headers = Object.keys(results[0]).join(",");
  const csvContent = [
    headers,
    ...results.map((row) =>
      Object.values(row)
        .map((v) => (typeof v === "number" ? v.toFixed(4) : v))
        .join(",")
    ),
  ].join("\n");

  fs.writeFileSync(csvPath, csvContent);
  console.log(`Resultados salvos em ${csvPath}`);
}

runBenchmarks()
  .then((results) => {
    console.log("Comparações concluidas!");
    console.log(`Total de ${results.length} tamanhos diferentes testados.`);
  })
  .catch((error) => {
    console.error(error);
  });
