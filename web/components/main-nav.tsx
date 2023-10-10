import { Icon } from "@/components/icon"

interface MainNavProps {
  className?: string
}

export const MainNav: React.FC<MainNavProps> = ({ className }) => {
  return (
    <div className="flex justify-between pt-4 pb-4">
      <p className="text-lg">TuneTrail</p>
      <div className="flex gap-1">
        <Icon type="search" />
        <Icon type="notify" />
        <Icon type="user" />
        <Icon type="new-post" />
      </div>
    </div>
  )
}
