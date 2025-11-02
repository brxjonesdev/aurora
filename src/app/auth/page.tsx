'use client';
import React from 'react';
import { LoginForm } from '@/lib/aurora/features/auth-&-user/login-form';
import { SignupForm } from '@/lib/aurora/features/auth-&-user/sign-up-form';
import { AnimatePresence, motion } from 'framer-motion';

export default function Auth() {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');

  return (
    <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
      <section className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-md"
            >
              <LoginForm onChange={setMode} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-md"
            >
              <SignupForm onChange={setMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
