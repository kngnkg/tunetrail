import { JWT } from "next-auth/jwt"

import { env } from "@/env.mjs"

export const refreshTokens = async (token: JWT): Promise<JWT | null> => {
  try {
    if (!token.refreshToken) {
      throw new Error("Refresh token not found")
    }

    const client_id = env.COGNITO_CLIENT_ID
    const client_secret = env.COGNITO_CLIENT_SECRET

    const params = new URLSearchParams({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    })

    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    )

    // トークンをリフレッシュする
    const response = await fetch(`${env.COGNITO_DOMAIN}/oauth2/token`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      method: "POST",
      body: params.toString(),
    })

    const newTokens = await response.json()
    if (!response.ok) {
      throw newTokens
    }

    const expires_at = Math.floor(Date.now() / 1000) + newTokens.expires_in

    // 新しいトークンを返す
    return {
      ...token,
      idToken: newTokens.id_token,
      accessToken: newTokens.access_token,
      tokenExpires: expires_at,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
