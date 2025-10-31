"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Logo from "@/lib/shared/components/navbar-components/logo"
import UserMenu from "@/lib/shared/components/navbar-components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/lib/shared/components/ui/breadcrumb"
import { useServices } from "@/lib/aurora/core/useServices"
import { Story } from "@/lib/aurora/core/types/story"
import { SidebarTrigger } from "@/lib/shared/components/ui/sidebar"



export default function Navbar() {
  const { storyService } = useServices()
  const [isAuthed, setIsAuthed] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const [userID, setUserID] = useState<string>("")
  const supabase = createClient()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams<{ user: string; slug: string; view: string }>()

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        setIsAuthed(false)
        return
      }
      setIsAuthed(true)
      setUserID(data.user.id)
    }
    checkUser()
  }, [supabase, router, pathname])

  useEffect(() => {
    const fetchStories = async () => {
      const result = await storyService.getUsersStories(userID)
      if (!result.ok) {
        console.error("Error fetching stories:", result.error)
        return
      }
      setStories(result.data || [])
    }
    if (isAuthed) {
      fetchStories()
    }
  }, [isAuthed, supabase, userID])
  return (
    <header className="font-inter w-full flex items-center justify-around gap-4 ">
      {
        pathname !== "/aurora/home" && params.slug && (
          <>
            <SidebarTrigger className="" />
          </>
        )
      }
      <div className="flex h-16 items-center justify-between gap-2 md:gap-4 flex-1">
        {/* Left: Breadcrumb navigation */}
        <Breadcrumb className="text-xs md:text-sm flex-1 min-w-0">
          <BreadcrumbList className="flex-wrap gap-1 md:gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/aurora/home" className="text-foreground">
                <Logo />
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right: User menu */}
        <div className="flex-shrink-0">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
