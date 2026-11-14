export const algorithms = [
  { id: "bubble-sort", title: "Bubble Sort" },
  { id: "selection-sort", title: "Selection Sort" },
  { id: "insertion-sort", title: "Insertion Sort" },
  { id: "merge-sort", title: "Merge Sort" },
  { id: "quick-sort", title: "Quick Sort" },
] as const;

export type AlgorithmId = (typeof algorithms)[number]["id"];

export const speeds = [
  { id: "slow", title: "Slow", delay: 200 },
  { id: "medium", title: "Medium", delay: 50 },
  { id: "fast", title: "Fast", delay: 10 },
] as const;

export type SpeedId = (typeof speeds)[number]["id"];

export const arraySizes = [
  { id: "25", title: "25", value: 25 },
  { id: "50", title: "50", value: 50 },
  { id: "75", title: "75", value: 75 },
] as const;

export type ArraySizeId = (typeof arraySizes)[number]["id"];
