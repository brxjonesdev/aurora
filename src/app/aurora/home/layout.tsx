import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      {children}
    </main>
  )
}
