import { refreshTokens } from "@/service/auth/refresh-tokens"
import { toUser } from "@/service/transform"
import createUser from "@/service/user/create-user"
import getMe from "@/service/user/get-me"
import { NextAuthOptions } from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

import { env } from "@/env.mjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: env.COGNITO_CLIENT_ID,
      clientSecret: env.COGNITO_CLIENT_SECRET,
      issuer: env.COGNITO_ISSUER,
      checks: "nonce",
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // 最初のサインインの場合
      if (account && user) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.tokenExpires = account.expires_at

        // APIを呼び出してユーザー情報を取得する
        const me = await getMe(account.id_token!)

        if (!me) {
          // ユーザーが存在しない場合は、新規ユーザーを作成する
          const created = await createUser(account.id_token!)
          if (!created) {
            throw new Error("ユーザーの作成に失敗しました")
          }

          token.user = toUser(created)
          // 新規ユーザーフラグを立てる
          // 認証フロー終了時にクライアント側でユーザー登録画面にリダイレクトする
          token.isNewUser = true
          return token
        }

        // ユーザーが存在する場合
        token.isNewUser = false
        token.user = toUser(me)
        return token
      }

      // セッション更新時
      if (trigger === "update") {
        token.isNewUser = false
        return token
      }

      // トークンが期限切れの場合は、リフレッシュする
      if (Date.now() > (token.tokenExpires ?? 0) * 1000) {
        // リフレッシュトークンを使ってリフレッシュする
        const newToken = await refreshTokens(token)
        if (!newToken) {
          throw new Error("トークンのリフレッシュに失敗しました")
        }

        return newToken
      }

      // トークンが有効な場合は、そのまま返す
      return token
    },
    async session({ session, token }) {
      // JWTトークンをセッションに追加する
      if (session.user) {
        session.user = token.user
      }

      session.idToken = token.idToken
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.isNewUser = token.isNewUser

      return session
    },
  },
}
