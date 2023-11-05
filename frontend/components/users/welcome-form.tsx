"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LoginUser } from "@/types"
import { useSession } from "next-auth/react"

import { Button } from "../ui/button"
import { ProfileForm } from "./profile-form"
import { UserNameForm } from "./user-name-form"

export type Phase = "username" | "profile" | "complete"

export const isPhase = (phase: string): phase is Phase => {
  return ["username", "profile", "complete"].includes(phase)
}

interface WelcomeFormProps {
  user: LoginUser
  phase: Phase
}

export const WelcomeForm: React.FC<WelcomeFormProps> = ({
  user,
  phase = "username",
}) => {
  const { data: session, update } = useSession()
  const router = useRouter()

  const onClickFinish = async () => {
    if (!session || !session.isNewUser) {
      return
    }

    await update()

    router.push("/")
  }

  return (
    <>
      {phase === "username" && (
        <UserNameForm
          user={user}
          onUserUpdateComplete={() => router.push("/welcome?phase=profile")}
        />
      )}
      {phase === "profile" && (
        <ProfileForm
          user={user}
          onProfileUpdateComplete={() => router.push("/welcome?phase=complete")}
        />
      )}
      {phase === "complete" && (
        <div className="flex flex-col gap-4">
          <div>
            <p>プロフィールの登録が完了しました!</p>
          </div>
          <div>
            <Button
              className="bg-primary dark:bg-primary hover:bg-white dark:hover:bg-white"
              onClick={onClickFinish}
            >
              OK!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
