import { describe, expect, it } from "vitest"

import { algorithms } from "@/lib/algorithms"
import { frames } from "@/lib/sorting"

/** Deterministic PRNG so random cases are reproducible. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 2 ** 32
    return seed / 2 ** 32
  }
}

function randomArray(length: number, seed: number) {
  const rand = seeded(seed)
  return Array.from({ length }, () => Math.floor(rand() * 96) + 5)
}

const cases: [string, number[]][] = [
  ["empty", []],
  ["single element", [42]],
  ["already sorted", [1, 2, 3, 4, 5, 6, 7, 8]],
  ["reverse sorted", [8, 7, 6, 5, 4, 3, 2, 1]],
  ["duplicates", [5, 3, 5, 1, 3, 5, 1, 1]],
  ["random 25", randomArray(25, 1)],
  ["random 50", randomArray(50, 2)],
  ["random 75", randomArray(75, 3)],
]

describe.each(algorithms.map((a) => a.id))("%s", (algorithm) => {
  it.each(cases)("%s", (_, input) => {
    const snapshot = [...input]
    const all = [...frames(algorithm, input)]
    const inputValues = new Set(input)

    for (const frame of all) {
      expect(frame.array).toHaveLength(input.length)
      for (const v of frame.array) expect(inputValues.has(v)).toBe(true)
      for (const i of frame.active) {
        expect(Number.isInteger(i)).toBe(true)
        expect(i).toBeGreaterThanOrEqual(0)
        expect(i).toBeLessThan(input.length)
      }
    }

    const final = all.length > 0 ? all[all.length - 1].array : input
    expect(final).toEqual([...input].sort((a, b) => a - b))
    expect(input).toEqual(snapshot)
  })
})
