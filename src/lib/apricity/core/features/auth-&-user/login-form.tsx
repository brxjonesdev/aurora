'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/lib/shared/components/ui/button';
import { Input } from '@/lib/shared/components/ui/input';
import { Label } from '@/lib/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function LoginForm({ onChange }: { onChange: (mode: 'login' | 'register') => void }) {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setIsLoading(false);
    } else {
      router.push('/apricity/home');
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
  };

  return (
    <Card className="border-border/50 w-full">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-semibold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <a href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-border/50 flex justify-center border-t pt-6">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Button
            variant="link"
            className="text-primary p-0 hover:underline"
            onClick={() => onChange('register')}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
