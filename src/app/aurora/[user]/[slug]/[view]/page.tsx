import React from 'react'

export default async function page({ params }: { params: Promise<{ user: string; slug: string }> }) {
  const { user, slug } = await params
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4 justify-center items-center">
      <h1>
        User: {user}, Story: {slug}
      </h1>
    </section>
  )
}
