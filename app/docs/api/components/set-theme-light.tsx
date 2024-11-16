"use client";

import { useTheme } from "next-themes";

export function SetThemeLight() {
  const { setTheme, theme } = useTheme();

  setTheme("light");

  return <></>
}
