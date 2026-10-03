"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"

export function PasswordInput(
  props: Omit<React.ComponentProps<typeof Input>, "type">
) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="cyber-input-wrap">
      <Input {...props} type={visible ? "text" : "password"} />
      <button
        type="button"
        className="cyber-input-toggle"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? "HIDE" : "SHOW"}
      </button>
    </div>
  )
}
