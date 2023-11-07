"use client"

import * as React from "react"
import Image from "next/image"
import { AlbumInfo } from "@/types"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { SearchBar } from "../search-bar"
import { Skeleton } from "../ui/skeleton"

interface AlbumSelectProps {
  album: AlbumInfo | null
  setAlbum: (album: AlbumInfo) => void
}

export const AlbumSelect: React.FC<AlbumSelectProps> = ({
  album,
  setAlbum,
}: AlbumSelectProps) => {
  const [query, setQuery] = React.useState<string>("")

  const onChange = (e: any) => {
    setQuery(e.target.value)
  }

  const onKeyDown = () => {
    alert(`query: ${query}`)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          {album ? (
            <Image
              src={album.coverUrl}
              height={300}
              width={300}
              alt={album.name}
              className="rounded-lg w-28 h-28 sm:w-48 sm:h-48"
            />
          ) : (
            <Skeleton className="rounded-lg w-28 h-28 sm:w-48 sm:h-48" />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="h-4/6 flex flex-col gap-8">
        <DialogHeader className="mt-8">
          <SearchBar
            autoFocus
            value={query}
            onChange={onChange}
            onEnterKeyDown={onKeyDown}
          />
        </DialogHeader>
        <div>アルバムリスト</div>
      </DialogContent>
    </Dialog>
  )
}
