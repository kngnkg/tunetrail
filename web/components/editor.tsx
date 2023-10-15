"use client"

import * as React from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"

import { EDITOR_TOOLS } from "@/components/editor-tools"

type EditorProps = {
  data?: OutputData
  onChange?: (val: OutputData) => void
  holder: string
}

export const Editor: React.FC<EditorProps> = ({
  data,
  onChange,
  holder,
}: EditorProps) => {
  const ref = React.useRef<EditorJS>()

  // editorjsを初期化する
  React.useEffect(() => {
    if (ref.current) return

    const editor = new EditorJS({
      holder: "editor",
      placeholder: "Let`s write an awesome story!",
      tools: EDITOR_TOOLS,
    })

    ref.current = editor
  }, [])

  return <div id={holder} />
}
