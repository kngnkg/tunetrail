import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export const ReviewCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex p-4 sm:p-8">
        <div className="flex flex-col mr-4 sm:mr-12">
          <Skeleton className="rounded-lg w-28 h-28 sm:w-48 sm:h-48" />
        </div>
        <div className="sm:pt-2">
          <div className="mb-2">
            <Skeleton className="w-48 h-6" />
          </div>
          <div className="flex gap-1 mb-3 sm:mb-8 text-md sm:text-lg text-zinc-300 dark:text-zinc-300">
            <Skeleton className="w-12 h-4" />
          </div>
          <div className="flex gap-2 text-sm sm:text-md text-zinc-400 dark:text-zinc-400">
            <Skeleton className="rounded-full w-8 h-8" />
            <div className="flex flex-col">
              <Skeleton className="w-12 h-4" />
              <div className="flex gap-2 items-center">
                <Skeleton className="w-8 h-4" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
