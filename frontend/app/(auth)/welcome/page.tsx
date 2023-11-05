import { notFound, redirect } from "next/navigation"
import { toUser } from "@/service/transform"
import getMe from "@/service/user/get-me"
import { LoginUser } from "@/types"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth-options"
import { WelcomeForm } from "@/components/users/welcome-form"

export type Phase = "username" | "profile" | "complete"

export const isPhase = (phase: string): phase is Phase => {
  return ["username", "profile", "complete"].includes(phase)
}

interface WelcomePageProps {
  searchParams: { [key: string]: Phase | undefined }
}

const getCurrentUser = async (idToken: string): Promise<LoginUser | null> => {
  try {
    const resp = await getMe(idToken)
    if (!resp) {
      return null
    }

    return toUser(resp)
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const phase = searchParams.phase || "username"
  if (!isPhase(phase)) {
    return notFound()
  }

  const session = await getServerSession(authOptions)
  if (!session || !session.idToken) {
    return redirect("/")
  }

  const user = await getCurrentUser(session.idToken)
  if (!user) {
    return <p>Something went wrong.</p>
  }

  return (
    <>
      <section>
        <p>TuneTrail へようこそ!</p>
        <WelcomeForm user={user} phase={phase} />
      </section>
    </>
  )
}
