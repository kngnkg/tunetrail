"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { signIn } from "@/lib/auth-navigate"
import { useLoginUser } from "@/hooks/auth/use-login-user"
import { Icon } from "@/components/icon"

import { Button } from "./ui/button"

interface MainNavProps {
  className?: string
}

export const MainNav: React.FC<MainNavProps> = ({ className }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (session?.isNewUser) {
    router.push("/welcome")
  }

  return (
    <div className="flex gap-4 items-center">
      {session?.user && (
        <>
          <Link href="/search">
            <Icon type="search" />
          </Link>
          <Icon type="notify" />
          <Link href="/userpage">
            <Icon type="user" className="w-8 h-8" />
          </Link>
          <Link href="/editor/new">
            <Icon
              type="new-post"
              className="text-primary dark:text-primary w-8 h-8"
            />
          </Link>
        </>
      )}
      {!session && status === "unauthenticated" && (
        <Button
          className="bg-primary dark:bg-primary hover:bg-white dark:hover:bg-white"
          onClick={() => signIn()}
        >
          ログイン
        </Button>
      )}
    </div>
  )
}
