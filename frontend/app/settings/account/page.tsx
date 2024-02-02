import { UserDeleteDialog } from "@/components/users/user-delete-dialog"

export default async function AccountPage() {
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <div className="mt-12">
          <UserDeleteDialog>
            <p className="text-red-700">アカウントを削除する</p>
          </UserDeleteDialog>
        </div>
      </section>
    </>
  )
}
