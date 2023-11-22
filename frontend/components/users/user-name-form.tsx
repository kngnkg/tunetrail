"use client"

import { LoginUser } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { userNameSchema } from "@/lib/validations/user"
import { Button } from "@/components/ui/button"
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

interface UserNameFormProps {
  className?: string
  user: Pick<LoginUser, "username" | "immutableId">
  onUserUpdateComplete?: () => void // 送信時のコールバック
}

const userNameFormSchema = z.object({
  username: userNameSchema,
})

type FormData = z.infer<typeof userNameFormSchema>

export const UserNameForm: React.FC<UserNameFormProps> = ({
  className,
  user,
  onUserUpdateComplete,
}) => {
  const currentUserName = user.username

  const form = useForm<FormData>({
    resolver: zodResolver(userNameFormSchema),
    defaultValues: {
      username: currentUserName,
    },
  })

  const onSubmit = async (values: FormData) => {
    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${currentUserName}`,
        {
          method: "PATCH",
          body: JSON.stringify({ username: values.username }),
        }
      )

      if (!resp) {
        throw new Error("ユーザー名の変更に失敗しました")
      }

      if (onUserUpdateComplete) {
        onUserUpdateComplete()
      }
    } catch (e) {
      console.error(e)
      alert("ユーザー名の変更に失敗しました")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">決定</Button>
        </div>
      </form>
    </Form>
  )
}
