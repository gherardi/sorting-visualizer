import type { AlgorithmId } from "@/lib/algorithms"

export type Frame = {
  array: readonly number[]
  /** Positions being compared or written in this Frame. */
  active: readonly number[]
}

/**
 * The single source of truth for the Array while a sort runs. Each operation
 * changes the Array (if it changes anything) and returns the Frame to yield,
 * so a sorter cannot report a move it did not make.
 */
class TrackedArray {
  readonly #values: number[]

  constructor(input: readonly number[]) {
    this.#values = [...input]
  }

  get length() {
    return this.#values.length
  }

  at(i: number) {
    return this.#values[i]
  }

  compare(i: number, j: number): Frame {
    return this.#frame([i, j])
  }

  swap(i: number, j: number): Frame {
    const v = this.#values
    ;[v[i], v[j]] = [v[j], v[i]]
    return this.#frame([i, j])
  }

  set(i: number, value: number): Frame {
    this.#values[i] = value
    return this.#frame([i])
  }

  #frame(active: number[]): Frame {
    return { array: [...this.#values], active }
  }
}

type Sorter = (t: TrackedArray) => Generator<Frame, void, undefined>

function* bubbleSort(t: TrackedArray) {
  for (let end = t.length - 1; end > 0; end--) {
    let swapped = false
    for (let i = 0; i < end; i++) {
      yield t.compare(i, i + 1)
      if (t.at(i) > t.at(i + 1)) {
        yield t.swap(i, i + 1)
        swapped = true
      }
    }
    if (!swapped) break
  }
}

function* selectionSort(t: TrackedArray) {
  for (let i = 0; i < t.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < t.length; j++) {
      yield t.compare(min, j)
      if (t.at(j) < t.at(min)) min = j
    }
    if (min !== i) yield t.swap(i, min)
  }
}

function* insertionSort(t: TrackedArray) {
  for (let i = 1; i < t.length; i++) {
    for (let j = i; j > 0; j--) {
      yield t.compare(j - 1, j)
      if (t.at(j - 1) <= t.at(j)) break
      yield t.swap(j - 1, j)
    }
  }
}

function* mergeSort(t: TrackedArray) {
  function* sort(lo: number, hi: number): Generator<Frame, void, undefined> {
    if (hi - lo < 1) return
    const mid = Math.floor((lo + hi) / 2)
    yield* sort(lo, mid)
    yield* sort(mid + 1, hi)

    const left: number[] = []
    const right: number[] = []
    for (let x = lo; x <= mid; x++) left.push(t.at(x))
    for (let x = mid + 1; x <= hi; x++) right.push(t.at(x))

    let i = 0
    let j = 0
    let k = lo
    while (i < left.length && j < right.length) {
      yield t.compare(lo + i, mid + 1 + j)
      yield t.set(k++, left[i] <= right[j] ? left[i++] : right[j++])
    }
    while (i < left.length) yield t.set(k++, left[i++])
    while (j < right.length) yield t.set(k++, right[j++])
  }

  yield* sort(0, t.length - 1)
}

function* quickSort(t: TrackedArray) {
  function* sort(lo: number, hi: number): Generator<Frame, void, undefined> {
    if (lo >= hi) return
    const pivot = t.at(hi)
    let p = lo
    for (let j = lo; j < hi; j++) {
      yield t.compare(j, hi)
      if (t.at(j) < pivot) {
        if (p !== j) yield t.swap(p, j)
        p++
      }
    }
    if (p !== hi) yield t.swap(p, hi)
    yield* sort(lo, p - 1)
    yield* sort(p + 1, hi)
  }

  yield* sort(0, t.length - 1)
}

const sorters: Record<AlgorithmId, Sorter> = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "merge-sort": mergeSort,
  "quick-sort": quickSort,
}

/**
 * Every Frame of sorting `array` with `algorithm`, produced lazily. Only
 * operation Frames are yielded: there is no initial or final "sorted" Frame.
 * `array` is never mutated.
 */
export function frames(
  algorithm: AlgorithmId,
  array: readonly number[]
): Generator<Frame, void, undefined> {
  return sorters[algorithm](new TrackedArray(array))
}
