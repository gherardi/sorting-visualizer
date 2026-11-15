"use client"

import { useEffect } from "react"

import { cn } from "cn"
import { useVisualizer } from "@/lib/store"

export function Bars() {
  const array = useVisualizer((s) => s.array)
  const active = useVisualizer((s) => s.active)
  const sorted = useVisualizer((s) => s.sorted)
  const randomizeArray = useVisualizer((s) => s.randomizeArray)

  useEffect(() => {
    if (useVisualizer.getState().array.length === 0) randomizeArray()
  }, [randomizeArray])

  return (
    <div className="flex flex-1 items-end justify-center gap-px rounded-xl bg-muted/50 p-8 sm:gap-0.5">
      {array.map((value, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 rounded-t-sm",
            active.includes(i)
              ? "bg-yellow-300"
              : sorted
                ? "bg-chart-2"
                : "bg-primary"
          )}
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  )
}
