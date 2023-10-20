"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import { MenuTab, MenuTabs } from "@/components/menu-tabs"

import { SearchBar } from "./search-bar"

export const Search: React.FC = () => {
  const params = useSearchParams()

  const query = params.get("q") || ""

  const baseUrl = "/search"
  const tabs: MenuTab[] = [
    {
      label: "レビュー",
      value: "reviews",
      href: `${baseUrl}?q=${query}`,
    },
    {
      label: "ユーザー",
      value: "users",
      href: `${baseUrl}/users?q=${query}`,
    },
    {
      label: "ジャンル",
      value: "genres",
      href: `${baseUrl}/genres?q=${query}`,
    },
  ]

  return (
    <>
      <div className="mb-8">
        <SearchBar autoFocus={true} />
      </div>
      <MenuTabs tabs={tabs} />
      <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
    </>
  )
}
