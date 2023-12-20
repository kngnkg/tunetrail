import { Skeleton } from "../ui/skeleton"

export const UserSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-12 h-4" />
      </div>
      <Skeleton className="h-9 w-24 rounded-md px-3" />
    </div>
  )
}
