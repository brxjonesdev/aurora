"use client"
import React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { LoginForm } from "@/lib/aurora/features/auth-&-user/login-form"
import { SignupForm } from "@/lib/aurora/features/auth-&-user/sign-up-form"
import { AnimatePresence, motion } from "framer-motion"

export default function Auth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode] = React.useState<"login" | "register">("login")

 

  return (
    <section className="flex-1 w-full flex items-center justify-center p-4 lg:p-8">
      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div
        key="login"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
          >
        <LoginForm onChange={setMode} />
          </motion.div>
        ) : (
          <motion.div
        key="signup"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
          >
        <SignupForm onChange={setMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
