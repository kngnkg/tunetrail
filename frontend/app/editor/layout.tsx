import { Header } from "@/components/header"

interface EditorLayoutProps {
  children: React.ReactNode
}

export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-1">
        <div className="border-solid border-b border-zinc-700 dark:border-zinc-700" />
        <div className="sm:w-4/6 mx-auto">{children}</div>
      </main>
    </div>
  )
}
