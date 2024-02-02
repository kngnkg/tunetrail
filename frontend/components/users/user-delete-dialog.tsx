"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signOut, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface UserDeleteDialogProps {
  children: React.ReactNode
  className?: string
}

export const formSchema = z.string().regex(/^削除$/, {
  message: "削除するには、以下に”削除”と入力してください。",
})

const userDeleteFormSchema = z.object({
  input: formSchema,
})

type FormData = z.infer<typeof userDeleteFormSchema>

export const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({
  children,
  className,
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(userDeleteFormSchema),
    defaultValues: {
      input: "",
    },
  })

  if (!session || !session.user) {
    router.push("/login")
  }

  const onSubmit = async (values: FormData) => {
    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${session?.user.username}`,
        {
          method: "DELETE",
        }
      )

      if (!resp) {
        throw new Error("ユーザーの削除に失敗しました")
      }

      // ログアウトしてトップページに遷移
      await signOut({
        callbackUrl: "/",
      })
    } catch (e) {
      console.error(e)
      alert("ユーザーの削除に失敗しました")
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="text-zinc-500 dark:text-zinc-400">
        {children}
      </DialogTrigger>
      <DialogContent className="h-4/6 flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <p>アカウントを削除する</p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>アカウントを削除すると、元に戻せません。</p>
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-zinc-500 dark:text-zinc-400">
                    削除するには、以下に”削除”と入力してください。
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="削除" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <DialogClose asChild={true}>
                <Button variant="link" type="button">
                  キャンセル
                </Button>
              </DialogClose>
              <Button variant="destructive" type="submit">
                アカウントを削除
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
