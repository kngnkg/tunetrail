"use client"

import * as React from "react"
import Link from "next/link"
import { PublishedStatus, Review } from "@/types"
import { OutputData } from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import "@/styles/editor.css"
import { PublishedStatusType } from "@/types/type-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import EditorBlock from "./editor-block"

const postSchema = z.object({
  title: z.string().min(1).max(100),

  // TODO: editorjsのデータ構造をzodで定義する
  content: z.any(),
})

interface ReviewFormProps {
  review?: Review
}

type FormData = z.infer<typeof postSchema>

export const ReviewForm: React.FC<ReviewFormProps> = ({
  review,
}: ReviewFormProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  })
  const [data, setData] = React.useState<OutputData | null>(
    review ? review.content : null
  )
  const [publishedStatus, setPublishedStatus] = React.useState<PublishedStatus>(
    review ? review.publishedStatus : PublishedStatusType.Draft
  )
  const [saving, setSaving] = React.useState<boolean>(false)

  const onSubmitCreate = async (titleInputData: FormData) => {
    // userIdはトークンから取得する
    alert(
      JSON.stringify({
        publishedStatus: publishedStatus,
        title: titleInputData.title,
        content: data,
      })
    )
  }

  const onSubmitUpdate = async (titleInputData: FormData) => {
    alert(
      JSON.stringify({
        publishedStatus: publishedStatus,
        title: titleInputData.title,
        content: data,
      })
    )
  }

  const onSubmit = async (titleInputData: FormData) => {
    setSaving(true)
    if (review) {
      await onSubmitUpdate(titleInputData)
      setSaving(false)
      return
    }

    await onSubmitCreate(titleInputData)
    setSaving(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">キャンセル</Link>
          <Button
            type="submit"
            onClick={() => setPublishedStatus(PublishedStatusType.Draft)}
          >
            下書きに保存
          </Button>
          <Button
            type="submit"
            onClick={() => setPublishedStatus(PublishedStatusType.Published)}
          >
            投稿する
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <Input
              autoFocus
              id="title"
              defaultValue={review && review.title}
              placeholder="タイトル"
              {...register("title")}
            />
          </div>
          <EditorBlock initialData={review?.content} onChange={setData} />
        </div>
      </form>
    </>
  )
}
