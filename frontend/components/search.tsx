"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { MenuTab, MenuTabs } from "@/components/menu-tabs"

import { SearchBar } from "./search-bar"

export const Search: React.FC = () => {
  const router = useRouter()
  const [query, setQuery] = React.useState<string>("")

  const params = useSearchParams()

  const queryFromParam = params.get("q") || ""

  const baseUrl = "/search"
  const tabs: MenuTab[] = [
    {
      label: "レビュー",
      value: "reviews",
      href: `${baseUrl}?q=${queryFromParam}`,
    },
    {
      label: "ユーザー",
      value: "users",
      href: `${baseUrl}/users?q=${queryFromParam}`,
    },
  ]

  const onChange = (e: any) => {
    setQuery(e.target.value)
  }

  const onKeyDown = () => {
    router.push(`?q=${query}`)
  }

  return (
    <>
      <div className="mb-8">
        <SearchBar
          autoFocus={true}
          value={query}
          onChange={onChange}
          onEnterKeyDown={onKeyDown}
        />
      </div>
      <MenuTabs tabs={tabs} />
      <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
    </>
  )
}
