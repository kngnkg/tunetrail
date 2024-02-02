"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserNameDialogProps {
  children: React.ReactNode
  className?: string
}

export const UserNameDialog: React.FC<UserNameDialogProps> = ({
  children,
  className,
}) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || !session.user) {
    router.push("/login")
  }

  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        {children}
      </DialogTrigger>
      <DialogContent className="h-4/6 flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <p>タイトル</p>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
