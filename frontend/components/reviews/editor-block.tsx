"use client"

import * as React from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"

import { EDITOR_TOOLS } from "@/components/reviews/editor-tools"

interface EditorBlockProps {
  initialData?: OutputData
  onChange: (data: OutputData) => void
}

const EditorBlock: React.FC<EditorBlockProps> = ({
  initialData,
  onChange,
}: EditorBlockProps) => {
  const ref = React.useRef<EditorJS>()
  // editorjsを初期化する
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (ref.current) return

    const editor = new EditorJS({
      holder: "editor",
      placeholder: "Let`s write an awesome story!",
      tools: EDITOR_TOOLS,
      data: initialData && initialData,
      async onChange(api, event) {
        const data = await api.saver.save()
        onChange(data)
      },
    })

    ref.current = editor
  }, [initialData, onChange])

  return <div id="editor" className="prose prose-zinc dark:prose-invert" />
}

export default React.memo(EditorBlock)
