"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVisualizer } from "@/lib/store";

export function SidebarActions() {
  const randomizeArray = useVisualizer((s) => s.randomizeArray);

  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<label htmlFor="actions" />}>
        Actions
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex gap-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Randomize array"
                onClick={randomizeArray}
              >
                <RotateCcw />
              </Button>
            }
          />
          <TooltipContent>Randomize Array</TooltipContent>
        </Tooltip>
        <Button className="flex-1">Sort Array</Button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
