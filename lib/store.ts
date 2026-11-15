import { create } from "zustand"

import {
  arraySizes,
  speeds,
  type AlgorithmId,
  type ArraySizeId,
  type SpeedId,
} from "@/lib/algorithms"
import { sorters } from "@/lib/sorting"

const MIN_VALUE = 5
const MAX_VALUE = 100

function generateArray(sizeId: ArraySizeId): number[] {
  const size = arraySizes.find((s) => s.id === sizeId)!.value
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  )
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type VisualizerState = {
  algorithm: AlgorithmId
  arraySize: ArraySizeId
  speed: SpeedId
  array: number[]
  isSorting: boolean
  /** Indices currently being compared or moved. */
  active: number[]
  sorted: boolean
  setAlgorithm: (algorithm: AlgorithmId) => void
  setArraySize: (arraySize: ArraySizeId) => void
  setSpeed: (speed: SpeedId) => void
  randomizeArray: () => void
  sortArray: () => Promise<void>
}

export const useVisualizer = create<VisualizerState>()((set, get) => ({
  algorithm: "bubble-sort",
  arraySize: "50",
  speed: "medium",
  // Empty on the server; populated on mount to avoid hydration mismatches.
  array: [],
  isSorting: false,
  active: [],
  sorted: false,
  setAlgorithm: (algorithm) => {
    if (get().isSorting) return
    set({ algorithm })
  },
  setArraySize: (arraySize) => {
    if (get().isSorting) return
    set({ arraySize, array: generateArray(arraySize), sorted: false })
  },
  setSpeed: (speed) => set({ speed }),
  randomizeArray: () => {
    if (get().isSorting) return
    set({ array: generateArray(get().arraySize), sorted: false })
  },
  sortArray: async () => {
    const { isSorting, algorithm, array } = get()
    if (isSorting) return
    set({ isSorting: true, sorted: false, active: [] })

    const working = [...array]
    for (const step of sorters[algorithm](array)) {
      let active: number[]
      if (step.type === "overwrite") {
        working[step.index] = step.value
        active = [step.index]
      } else {
        const [i, j] = step.indices
        if (step.type === "swap") {
          ;[working[i], working[j]] = [working[j], working[i]]
        }
        active = [i, j]
      }
      set({ array: [...working], active })
      // Read the delay on every step so the current speed always applies.
      await sleep(speeds.find((s) => s.id === get().speed)!.delay)
    }

    set({ isSorting: false, active: [], sorted: true })
  },
}))
