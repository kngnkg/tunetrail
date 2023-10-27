import SpotifyWebApi from "spotify-web-api-node"

import { env } from "@/env.mjs"

// export const client = new SpotifyWebApi({
//   clientId: env.SPOTIFY_CLIENT_ID,
//   clientSecret: env.SPOTIFY_CLIENT_SECRET,
// })

// // アクセストークンを取得する
// client.clientCredentialsGrant().then(
//   function (data) {
//     client.setAccessToken(data.body["access_token"])
//   },
//   function (err) {
//     console.log("Something went wrong when retrieving an access token", err)
//   }
// )
