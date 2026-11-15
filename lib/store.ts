import { create } from "zustand"

import {
  arraySizes,
  type AlgorithmId,
  type ArraySizeId,
  type SpeedId,
} from "@/lib/algorithms"

const MIN_VALUE = 5
const MAX_VALUE = 100

function generateArray(sizeId: ArraySizeId): number[] {
  const size = arraySizes.find((s) => s.id === sizeId)!.value
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
  )
}

type VisualizerState = {
  algorithm: AlgorithmId
  arraySize: ArraySizeId
  speed: SpeedId
  array: number[]
  setAlgorithm: (algorithm: AlgorithmId) => void
  setArraySize: (arraySize: ArraySizeId) => void
  setSpeed: (speed: SpeedId) => void
  randomizeArray: () => void
}

export const useVisualizer = create<VisualizerState>()((set, get) => ({
  algorithm: "bubble-sort",
  arraySize: "50",
  speed: "medium",
  // Empty on the server; populated on mount to avoid hydration mismatches.
  array: [],
  setAlgorithm: (algorithm) => set({ algorithm }),
  setArraySize: (arraySize) =>
    set({ arraySize, array: generateArray(arraySize) }),
  setSpeed: (speed) => set({ speed }),
  randomizeArray: () => set({ array: generateArray(get().arraySize) }),
}))
