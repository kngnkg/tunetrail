"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Icon } from "@/components/icon"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value: string
  onChange: (e: any) => void
  onEnterKeyDown?: () => void // Enter キー押下時のコールバック
}

const enterKeyCode = 13

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, value, onChange, onEnterKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: any) => {
      if (!onEnterKeyDown) return

      if (e.keyCode !== enterKeyCode) return
      if (!value) return

      e.preventDefault()

      onEnterKeyDown()
    }

    return (
      <div className="flex items-center relative">
        <Icon type="search" className="absolute left-4" />
        <Input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="h-12 text-lg bg-transparent pl-14"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"
