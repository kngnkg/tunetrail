import { signIn as nextAuthSignIn } from "next-auth/react"

// サインインフローを完了した後にユーザが閲覧しようとしたページにリダイレクトする
export const signIn = () => {
  return nextAuthSignIn()
}
