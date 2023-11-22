"use client"

import { LoginUser } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { env } from "@/env.mjs"
import { clientFetcher } from "@/lib/fetcher"
import { profileSchema } from "@/lib/validations/user"
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

interface ProfileFormProps {
  className?: string
  user: LoginUser
  onProfileUpdateComplete?: () => void // 送信時のコールバック
}

type FormData = z.infer<typeof profileSchema>

export const ProfileForm: React.FC<ProfileFormProps> = ({
  className,
  user,
  onProfileUpdateComplete,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
    },
  })

  const onSubmit = async (values: FormData) => {
    try {
      const resp = await clientFetcher(
        `${env.NEXT_PUBLIC_API_ROOT}/users/${user.username}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            displayName: values.displayName,
            avatarUrl: values.avatarUrl ?? undefined,
            bio: values.bio ?? undefined,
          }),
        }
      )

      if (!resp) {
        throw new Error("ユーザー名の変更に失敗しました")
      }

      if (onProfileUpdateComplete) {
        onProfileUpdateComplete()
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
        {/* TODO: アバター */}
        <FormField
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>表示名</FormLabel>
              <FormControl>
                <Input placeholder="表示名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>自己紹介</FormLabel>
              <FormControl>
                <Input placeholder="自己紹介" {...field} />
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
