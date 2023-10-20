"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Icon } from "@/components/icon"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const enterKeyCode = 13

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter()
    const [query, setQuery] = React.useState("")

    const handleChange = (e: any) => {
      setQuery(e.target.value)
    }

    const handleKeyDown = (e: any) => {
      if (e.keyCode !== enterKeyCode) return
      if (!query) return

      e.preventDefault()

      router.push(`?q=${query}`)
    }

    return (
      <div className="flex items-center relative">
        <Icon type="search" className="absolute left-4" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
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
