interface UserPageProps {
  params: { userId: string }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <>
      <section>
        <p>{params.userId}さんのページ</p>
      </section>
    </>
  )
}
