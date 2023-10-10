interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container">ヘッダー</header>
      <main className="container flex-1">{children}</main>
      {/* <footer className="container">フッター</footer> */}
    </div>
  )
}
