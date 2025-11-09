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
import { nanoid } from 'nanoid';

export function SignupForm({ onChange }: { onChange: (mode: 'login' | 'register') => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/aurora/home',
        data: {
          full_name: name,
          avatar_id: nanoid(42),
        },
      },
    });
    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Check email to confirm account:', data);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add your registration logic here
    if (password !== confirmPassword) {
      console.log('[v0] Passwords do not match');
      setIsLoading(false);
      return;
    }
    console.log('[v0] Registration attempt:', { name, email, password: '***' });
    await signUp(email, password);
  };

  return (
    <Card className="border-border/50 w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-semibold tracking-tight">Create an account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>
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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-input border-border"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-border/50 flex justify-center border-t pt-6">
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Button
            variant="link"
            className="text-primary p-0 hover:underline"
            onClick={() => onChange('login')}
          >
            Log in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
