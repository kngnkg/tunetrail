"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AlbumInfo, PublishedStatus, Review } from "@/types"
import { OutputData } from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import "@/styles/editor.css"
import { useRouter } from "next/navigation"

import { PublishedStatusType } from "@/types/type-guard"
import { ReviewFormData, reviewTitleSchema } from "@/lib/validations/review"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { AlbumSelect } from "./album-select"
import EditorBlock from "./editor-block"

interface ReviewFormProps {
  initialReview?: Review
  onSubmit: (data: ReviewFormData) => void
}

const reviewTitleFormSchema = z.object({
  title: reviewTitleSchema,
})

type ReviewTitleFormData = z.infer<typeof reviewTitleFormSchema>

export const ReviewForm: React.FC<ReviewFormProps> = ({
  initialReview,
  onSubmit,
}: ReviewFormProps) => {
  const router = useRouter()
  const form = useForm<ReviewTitleFormData>({
    resolver: zodResolver(reviewTitleFormSchema),
    defaultValues: {
      title: initialReview ? initialReview.title : "",
    },
  })
  const [data, setData] = React.useState<OutputData | null>(
    initialReview ? initialReview.content : null
  )
  const [publishedStatus, setPublishedStatus] = React.useState<PublishedStatus>(
    initialReview ? initialReview.publishedStatus : PublishedStatusType.Draft
  )
  const [album, setAlbum] = React.useState<AlbumInfo | null>(
    initialReview ? initialReview.album : null
  )
  const [saving, setSaving] = React.useState<boolean>(false)

  const handleFormSubmit = async (InputData: ReviewTitleFormData) => {
    setSaving(true)

    if (!album) {
      alert("アルバムを選択してください")
      return
    }

    onSubmit({
      albumId: album.albumId,
      title: InputData.title,
      content: data,
      publishedStatus: publishedStatus,
    })

    switch (publishedStatus) {
      case PublishedStatusType.Draft:
        alert("下書きに保存しました")
        break
      case PublishedStatusType.Published:
        alert("投稿しました")
        router.push("/")
        break
    }

    setSaving(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex items-center justify-between gap-8">
          <Link href="/">キャンセル</Link>
          <div className="flex gap-8">
            <Button
              type="submit"
              onClick={() => setPublishedStatus(PublishedStatusType.Draft)}
            >
              下書きに保存
            </Button>
            <Button
              className="bg-primary dark:bg-primary"
              type="submit"
              onClick={() => {
                console.log("published")
                console.log(
                  `form errors: ${JSON.stringify(form.formState.errors)}`
                )
                setPublishedStatus(PublishedStatusType.Published)
              }}
            >
              投稿する
            </Button>
          </div>
        </div>
        <div>
          <AlbumSelect album={album} setAlbum={setAlbum} />
        </div>
        <div className="flex flex-col gap-8">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="タイトル" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <EditorBlock
            initialData={initialReview?.content}
            onChange={setData}
          />
        </div>
      </form>
    </Form>
  )
}
