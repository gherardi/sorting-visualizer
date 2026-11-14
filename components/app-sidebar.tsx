"use client";

import {
  AlgorithmSetting,
  ArraySizeSetting,
  SpeedSetting,
} from "@/components/sidebar/settings";
import { SidebarActions } from "@/components/sidebar/sidebar-actions";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <AlgorithmSetting />
        <ArraySizeSetting />
        <SpeedSetting />
        <SidebarActions />
      </SidebarContent>
    </Sidebar>
  );
}
