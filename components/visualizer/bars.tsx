"use client"

import { useEffect } from "react"

import { useVisualizer } from "@/lib/store"

export function Bars() {
  const array = useVisualizer((s) => s.array)
  const randomizeArray = useVisualizer((s) => s.randomizeArray)

  useEffect(() => {
    if (useVisualizer.getState().array.length === 0) randomizeArray()
  }, [randomizeArray])

  return (
    <div className="flex flex-1 items-end justify-center gap-px rounded-xl bg-muted/50 p-8 sm:gap-0.5">
      {array.map((value, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-primary transition-[height] duration-150"
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  )
}
