import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { WelcomeForm } from "@/components/users/welcome-form"
import { Phase, isPhase } from "@/components/users/welcome-phase"

interface WelcomePageProps {
  searchParams: { [key: string]: Phase | undefined }
}

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const phase = searchParams.phase || "username"
  if (!isPhase(phase)) {
    return notFound()
  }

  const user = await getCurrentUser()
  if (!user) {
    return <p>Something went wrong.</p>
  }

  return (
    <>
      <section>
        <p>Foderee へようこそ!</p>
        <WelcomeForm user={user} phase={phase} />
      </section>
    </>
  )
}
