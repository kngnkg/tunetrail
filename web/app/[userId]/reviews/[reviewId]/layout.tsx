interface ReviewLayoutProps {
  children: React.ReactNode
}

export default function ReviewLayout({ children }: ReviewLayoutProps) {
  return <div className="sm:w-10/12 sm:mx-auto">{children}</div>
}
