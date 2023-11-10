"use client"

import * as React from "react"
import { AlbumInfo } from "@/types"
import { DialogClose } from "@radix-ui/react-dialog"

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
import { AlbumArt } from "./album"
import { AlbumList } from "./album-list"

interface AlbumSelectProps {
  album: AlbumInfo | null
  setAlbum: (album: AlbumInfo) => void
}

export const AlbumSelect: React.FC<AlbumSelectProps> = ({
  album,
  setAlbum,
}: AlbumSelectProps) => {
  const [inputValue, setInputValue] = React.useState<string>("")
  const [query, setQuery] = React.useState<string>("")
  const { data, error, isLoading, loadMore } = useAlbums({
    query: query,
    limit: 20,
  })

  const onChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const onKeyDown = () => {
    setQuery(inputValue)
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
            <AlbumArt album={album} />
          ) : (
            <div className="flex items-center justify-center relative">
              <Icon type="add" className="absolute w-28 h-28 sm:w-28 sm:h-28" />
              <div className="bg-zinc-700 rounded-none w-28 h-28 sm:w-48 sm:h-48" />
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="h-4/6 flex flex-col gap-8">
        <DialogHeader className="mt-8">
          <SearchBar
            autoFocus
            value={inputValue}
            onChange={onChange}
            onEnterKeyDown={onKeyDown}
          />
        </DialogHeader>
        <ScrollArea>
          {query && data ? (
            <>
              <DialogClose>
                <AlbumList
                  data={data}
                  isLoading={isLoading}
                  setAlbum={setAlbum}
                />
              </DialogClose>
              <div className="mb-20 flex flex-col items-center">
                <Button variant="ghost" size="lg" onClick={() => loadMore()}>
                  もっと見る
                </Button>
              </div>
            </>
          ) : (
            <p>検索条件を入力してください。</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
