import Link from "next/link"

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="container mt-10 sm:mt-0 sm:w-4/5 flex justify-between pt-4 pb-4">
      <Link href="/">
        <p className="text-lg">TuneTrail</p>
      </Link>
      {children}
    </header>
  )
}
