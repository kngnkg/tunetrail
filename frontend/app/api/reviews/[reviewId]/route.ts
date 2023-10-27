import { NextRequest, NextResponse } from "next/server"
import getAlbum from "@/service/api/album/get-album"
import getReview from "@/service/api/review/get-review"
import { toReview } from "@/service/api/transform"

interface ReviewRouteProps {
  params: { reviewId: string }
}

export async function GET(request: NextRequest, { params }: ReviewRouteProps) {
  const reviewId = params.reviewId
  console.log(reviewId)

  try {
    const reviewResp = await getReview(reviewId)

    if (!reviewResp) {
      return NextResponse.json(null, { status: 404 })
    }

    console.log(reviewResp)

    // SpotifyのAPIを叩いてアルバム情報を取得する
    const albumResp = await getAlbum(reviewResp.getAlbumid())

    // 型を整える
    const review = toReview(reviewResp, albumResp)

    return NextResponse.json(review)
  } catch (e) {
    console.error(e)
    return NextResponse.json(null, { status: 500 })
  }
}
