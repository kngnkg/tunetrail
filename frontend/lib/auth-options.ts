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
    async jwt({ token, user, account }) {
      // 最初のサインインの場合
      if (account && user) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.tokenExpires = account.expires_at

        // APIを呼び出してユーザー情報を取得する
        console.log("jwt: getMe")
        const me = await getMe(account.id_token!)

        if (!me) {
          // ユーザーが存在しない場合は、新規ユーザーを作成する
          const created = await createUser(account.id_token!)
          token.user = created
          // 新規ユーザーフラグを立てる
          // 認証フロー終了時にクライアント側でユーザー登録画面にリダイレクトする
          token.isNewUser = true
          return token
        }

        // ユーザーが存在する場合は、トークンに追加する
        token.user = me
        return token
      }

      // トークンが期限切れの場合は、リフレッシュする
      if (Date.now() > (token.tokenExpires ?? 0) * 1000) {
        // TODO: リフレッシュトークンを使ってリフレッシュする
        return token
      }

      // トークンが有効な場合は、そのまま返す
      return token
    },
    async session({ session, token }) {
      // JWTトークンをセッションに追加する
      if (session.user) {
        session.user = token.user
        // session.user.immutableId = token.sub
      }

      session.idToken = token.idToken
      session.accessToken = token.accessToken
      session.isNewUser = token.isNewUser
      return session
    },
  },
}
