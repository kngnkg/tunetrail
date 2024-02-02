import { notFound } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { ProfileForm } from "@/components/users/profile-form"

export default async function ProfilePage() {
  const loginUser = await getCurrentUser()
  if (!loginUser) {
    return notFound()
  }

  return (
    <>
      <section>
        <ProfileForm user={loginUser} />
      </section>
    </>
  )
}
