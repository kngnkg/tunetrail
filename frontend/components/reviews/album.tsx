import Image from "next/image"
import { AlbumInfo } from "@/types"

import { cn } from "@/lib/utils"

interface AlbumArtProps {
  album: AlbumInfo
  className?: string
}

export const AlbumArt: React.FC<AlbumArtProps> = ({ album, className }) => {
  return (
    <Image
      src={album.coverUrl}
      height={300}
      width={300}
      alt={album.name}
      className={cn("rounded-none w-28 h-28 sm:w-48 sm:h-48", className)}
    />
  )
}
