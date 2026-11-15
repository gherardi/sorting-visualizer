"use client";

import { SegmentedGroup, SelectGroup } from "@/components/sidebar/option-groups";
import { algorithms, arraySizes, speeds } from "@/lib/algorithms";
import { useVisualizer } from "@/lib/store";

export function AlgorithmSetting() {
  const algorithm = useVisualizer((s) => s.algorithm);
  const setAlgorithm = useVisualizer((s) => s.setAlgorithm);
  const isSorting = useVisualizer((s) => s.isSorting);

  return (
    <SelectGroup
      name="algorithm"
      label="Algorithm"
      options={algorithms}
      value={algorithm}
      onValueChange={setAlgorithm}
      disabled={isSorting}
    />
  );
}

export function ArraySizeSetting() {
  const arraySize = useVisualizer((s) => s.arraySize);
  const setArraySize = useVisualizer((s) => s.setArraySize);
  const isSorting = useVisualizer((s) => s.isSorting);

  return (
    <SegmentedGroup
      name="array-size"
      label="Array Size"
      options={arraySizes}
      value={arraySize}
      onValueChange={setArraySize}
      disabled={isSorting}
    />
  );
}

export function SpeedSetting() {
  const speed = useVisualizer((s) => s.speed);
  const setSpeed = useVisualizer((s) => s.setSpeed);
  const isSorting = useVisualizer((s) => s.isSorting);

  return (
    <SegmentedGroup
      name="speed"
      label="Speed"
      options={speeds}
      value={speed}
      onValueChange={setSpeed}
      disabled={isSorting}
    />
  );
}
