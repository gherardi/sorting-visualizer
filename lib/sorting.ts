import type { AlgorithmId } from "@/lib/algorithms"

export type SortStep =
  | { type: "compare"; indices: [number, number] }
  | { type: "swap"; indices: [number, number] }
  | { type: "overwrite"; index: number; value: number }

type Sorter = (input: number[]) => Generator<SortStep>

function swap(arr: number[], i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

function* bubbleSort(input: number[]): Generator<SortStep> {
  const arr = [...input]
  for (let end = arr.length - 1; end > 0; end--) {
    let swapped = false
    for (let i = 0; i < end; i++) {
      yield { type: "compare", indices: [i, i + 1] }
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        swapped = true
        yield { type: "swap", indices: [i, i + 1] }
      }
    }
    if (!swapped) break
  }
}

function* selectionSort(input: number[]): Generator<SortStep> {
  const arr = [...input]
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      yield { type: "compare", indices: [min, j] }
      if (arr[j] < arr[min]) min = j
    }
    if (min !== i) {
      swap(arr, i, min)
      yield { type: "swap", indices: [i, min] }
    }
  }
}

function* insertionSort(input: number[]): Generator<SortStep> {
  const arr = [...input]
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      yield { type: "compare", indices: [j - 1, j] }
      if (arr[j - 1] <= arr[j]) break
      swap(arr, j - 1, j)
      yield { type: "swap", indices: [j - 1, j] }
    }
  }
}

function* mergeSort(input: number[]): Generator<SortStep> {
  const arr = [...input]

  function* sort(lo: number, hi: number): Generator<SortStep> {
    if (hi - lo < 1) return
    const mid = Math.floor((lo + hi) / 2)
    yield* sort(lo, mid)
    yield* sort(mid + 1, hi)

    const left = arr.slice(lo, mid + 1)
    const right = arr.slice(mid + 1, hi + 1)
    let i = 0
    let j = 0
    let k = lo
    while (i < left.length && j < right.length) {
      yield { type: "compare", indices: [lo + i, mid + 1 + j] }
      const value = left[i] <= right[j] ? left[i++] : right[j++]
      arr[k] = value
      yield { type: "overwrite", index: k++, value }
    }
    while (i < left.length) {
      arr[k] = left[i++]
      yield { type: "overwrite", index: k, value: arr[k++] }
    }
    while (j < right.length) {
      arr[k] = right[j++]
      yield { type: "overwrite", index: k, value: arr[k++] }
    }
  }

  yield* sort(0, arr.length - 1)
}

function* quickSort(input: number[]): Generator<SortStep> {
  const arr = [...input]

  function* sort(lo: number, hi: number): Generator<SortStep> {
    if (lo >= hi) return
    const pivot = arr[hi]
    let p = lo
    for (let j = lo; j < hi; j++) {
      yield { type: "compare", indices: [j, hi] }
      if (arr[j] < pivot) {
        if (p !== j) {
          swap(arr, p, j)
          yield { type: "swap", indices: [p, j] }
        }
        p++
      }
    }
    if (p !== hi) {
      swap(arr, p, hi)
      yield { type: "swap", indices: [p, hi] }
    }
    yield* sort(lo, p - 1)
    yield* sort(p + 1, hi)
  }

  yield* sort(0, arr.length - 1)
}

export const sorters: Record<AlgorithmId, Sorter> = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "merge-sort": mergeSort,
  "quick-sort": quickSort,
}
