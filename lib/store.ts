import { create } from "zustand"

import type { AlgorithmId, ArraySizeId, SpeedId } from "@/lib/algorithms"

type VisualizerState = {
  algorithm: AlgorithmId
  arraySize: ArraySizeId
  speed: SpeedId
  setAlgorithm: (algorithm: AlgorithmId) => void
  setArraySize: (arraySize: ArraySizeId) => void
  setSpeed: (speed: SpeedId) => void
}

export const useVisualizer = create<VisualizerState>()((set) => ({
  algorithm: "bubble-sort",
  arraySize: "50",
  speed: "medium",
  setAlgorithm: (algorithm) => set({ algorithm }),
  setArraySize: (arraySize) => set({ arraySize }),
  setSpeed: (speed) => set({ speed }),
}))
