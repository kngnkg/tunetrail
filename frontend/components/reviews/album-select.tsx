"use client"

import * as React from "react"
import Image from "next/image"
import { AlbumInfo } from "@/types"
import { DialogClose } from "@radix-ui/react-dialog"

import { env } from "@/env.mjs"
import { useAlbums } from "@/hooks/albums/use-albums"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Icon } from "../icon"
import { SearchBar } from "../search-bar"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { AlbumList } from "./album-list"

interface AlbumSelectProps {
  album: AlbumInfo | null
  setAlbum: (album: AlbumInfo) => void
}

export const AlbumSelect: React.FC<AlbumSelectProps> = ({
  album,
  setAlbum,
}: AlbumSelectProps) => {
  const [query, setQuery] = React.useState<string>("")
  const { data, error, isLoading, loadMore } = useAlbums({
    endpoint: `${env.NEXT_PUBLIC_API_ROOT}/album-search?q=${query}`,
    limit: 20,
  })

  const onChange = (e: any) => {
    setQuery(e.target.value)
  }

  const onKeyDown = () => {
    alert(`query: ${query}`)
  }

  if (error) {
    console.error(error)
    return <p>Something went wrong.</p>
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
            <div className="flex items-center justify-center relative">
              <Icon type="add" className="absolute w-28 h-28 sm:w-28 sm:h-28" />
              <div className="bg-zinc-700 rounded-lg w-28 h-28 sm:w-48 sm:h-48" />
            </div>
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
        <ScrollArea>
          <DialogClose>
            <AlbumList data={data} isLoading={isLoading} setAlbum={setAlbum} />
          </DialogClose>
          <div className="mb-20 flex flex-col items-center">
            <Button variant="ghost" size="lg" onClick={() => loadMore()}>
              もっと見る
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
