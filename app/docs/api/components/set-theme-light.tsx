"use client";

import { useTheme } from "next-themes";

export function SetThemeLight() {
  const { setTheme } = useTheme();

  setTheme("light");

  return <></>
}
