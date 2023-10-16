"use client"

import * as React from "react"
import Link from "next/link"
import { Review } from "@/types"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EDITOR_TOOLS } from "@/components/editor-tools"

const postSchema = z.object({
  title: z.string().min(1).max(100),

  // TODO: editorjsのデータ構造をzodで定義する
  content: z.any(),
})

interface EditorProps {
  review: Review
}

type FormData = z.infer<typeof postSchema>

export const Editor: React.FC<EditorProps> = ({ review }: EditorProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  })
  const ref = React.useRef<EditorJS>()
  const [saving, setSaving] = React.useState<boolean>(false)

  const body = postSchema.parse(review)

  // editorjsを初期化する
  React.useEffect(() => {
    if (ref.current) return

    const editor = new EditorJS({
      holder: "editor",
      placeholder: "Let`s write an awesome story!",
      tools: EDITOR_TOOLS,
      data: body.content,
    })

    ref.current = editor
  }, [body])

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    const blocks = await ref.current?.save()

    // TODO: ここでAPIを叩く
    alert(
      JSON.stringify({
        title: data.title,
        content: blocks,
      })
    )

    setSaving(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <Link href="/">キャンセル</Link>
          <Button type="submit">下書きに保存</Button>
          <Button type="submit">Submit</Button>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <Input
              autoFocus
              id="title"
              defaultValue={body.title}
              placeholder="タイトル"
              {...register("title")}
            />
          </div>
          <div id="editor" />
        </div>
      </form>
    </>
  )
}
