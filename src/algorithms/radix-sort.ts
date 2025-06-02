export function radixSort(arr: number[]) {
  const max = Math.max(...arr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp);
  }

  return arr;
}

function countingSortForRadix(arr: number[], exp: number) {
  const output = new Array(arr.length).fill(0);
  const count = new Array(10).fill(0);

  for (const num of arr) {
    const digit = Math.floor((num / exp) % 10);
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor((arr[i] / exp) % 10);
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}
