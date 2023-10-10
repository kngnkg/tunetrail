import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section>
        <p>Home Page</p>
        <Button className="bg-primary dark:bg-primary">Click me</Button>
      </section>
    </>
  )
}
