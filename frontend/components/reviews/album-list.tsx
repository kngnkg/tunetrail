"use client"

import * as React from "react"
import { AlbumInfo, AlbumWithPagination } from "@/types"

import { Skeleton } from "../ui/skeleton"
import { AlbumArt } from "./album"

interface AlbumListProps {
  setAlbum: (album: AlbumInfo) => void
  data: AlbumWithPagination[] | undefined
  isLoading: boolean
}

export const AlbumList: React.FC<AlbumListProps> = ({
  data,
  isLoading,
  setAlbum,
}) => {
  if (!data) {
    return (
      <>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {Array(10)
              .fill(null)
              .map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Skeleton className="w-14 h-14" />
                  <Skeleton className="w-48 h-6" />
                </div>
              ))}
          </div>
        ) : (
          <p>no data.</p>
        )}
      </>
    )
  }

  // TODO: suspense
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {data.map((albumWithPagination, idx) => {
          return (
            <ul key={idx} className="flex flex-col gap-4">
              {albumWithPagination.albums.map((album, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setAlbum(album)}
                >
                  <AlbumArt
                    album={album}
                    className="w-14 h-14 sm:w-14 sm:h-14"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="text-sm sm:text-base">{album.name}</div>
                    <div className="text-xs sm:text-sm">
                      {album.artists[0].name}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        })}
      </div>
    </div>
  )
}
