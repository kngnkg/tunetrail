import React from "react"
import { Content as ContentType } from "@/types"

// editorjs-html は型定義がないので、requireで読み込む
const editorJsHtml = require("editorjs-html")
const EditorJsToHtml = editorJsHtml()

type Props = {
  data: ContentType
}
type ParsedContent = string | JSX.Element

export const Content = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[]
  return (
    <div className="prose prose-zinc dark:prose-invert">
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          )
        }
        return item
      })}
    </div>
  )
}
