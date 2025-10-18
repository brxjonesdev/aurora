'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/lib/shared/components/ui/button';
import { Input } from '@/lib/shared/components/ui/input';
import { Label } from '@/lib/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import Avatar from 'boring-avatars';
import { nanoid } from 'nanoid';
import { profileService } from '@/lib/aurora/core/user';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface OnboardingFormProps {
  userId: string;
  initialFullName: string | null;
  onComplete?: () => void;
}

export default function CreateProfile({
  userId,
  initialFullName,
  onComplete,
}: OnboardingFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName || '');
  const [username, setUsername] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  useEffect(() => {
    setAvatarId(`${nanoid(16)}-${nanoid(16)}`);
  }, []);

  const formattedName = fullName ? fullName.split(' ')[0] : 'User';

  const validateUsername = (value: string): string | null => {
    if (value.length < 3) return 'Username must be at least 3 characters.';
    if (value.length > 20) return 'Username cannot exceed 20 characters.';
    if (!/^[a-z0-9._]+$/.test(value))
      return 'Only lowercase letters, numbers, underscores, and dots allowed.';
    if (/^[._]/.test(value)) return 'Username cannot start with a dot or underscore.';
    if (/[._]{2,}/.test(value)) return 'Username cannot contain consecutive dots or underscores.';
    return null;
  };

  const handleUsernameChange = async (value: string) => {
    const val = value.trim().toLowerCase();
    setUsername(val);
    setError(null);

    const validationMsg = validateUsername(val);
    if (validationMsg) {
      setUsernameError(validationMsg);
      return;
    }

    setUsernameError(null);
    if (val.length >= 3) {
      setChecking(true);
      try {
        const available = await profileService.checkUsernameAvailability(val);
        if (!available) setUsernameError('This username is already taken.');
      } catch {
        setUsernameError('Could not check username availability.');
      } finally {
        setChecking(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const validationMsg = validateUsername(username);
      if (validationMsg) throw new Error(validationMsg);

      const available = await profileService.checkUsernameAvailability(username);
      if (!available) throw new Error('Username is already taken.');

      const result = await profileService.createProfile({
        id: userId,
        full_name: fullName.trim(),
        username,
        avatar_id: avatarId,
        onboarded: true,
      });

      if (!result.ok) {
        if (result.error === 'username_taken') {
          setError('That username was just taken. Try another.');
        } else {
          setError('An unexpected error occurred.');
        }
      } else {
        console.log('Profile created:', result.data);
        window.location.reload();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto h-fit w-full max-w-2xl border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to Aurora, {formattedName}!</CardTitle>
        <CardDescription>Let&apos;s get you set up with a profile.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 lg:flex-row">
        {/* Avatar */}
        <div className="flex min-w-1/4 flex-col items-center justify-center gap-4">
          <Avatar
            name={avatarId}
            colors={['#e7ecef', '#274c77', '#6096ba', '#a3cef1', '#8b8c89']}
            variant="beam"
            size={100}
          />
          <Button
            variant="link"
            size="sm"
            onClick={() => setAvatarId(`${nanoid(16)}-${nanoid(16)}`)}
          >
            Randomize Avatar
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex w-full gap-4 space-y-6">
          <section className="flex flex-1 flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                minLength={3}
              />
              {checking && (
                <p className="text-muted-foreground text-xs">Checking availability...</p>
              )}
              {usernameError && <p className="text-destructive text-xs">{usernameError}</p>}
              {!usernameError && !checking && username.length > 2 && (
                <p className="text-xs text-green-600">Looks good!</p>
              )}
              <p className="text-muted-foreground text-xs">
                3–20 chars. Use only lowercase letters, numbers, underscores, and dots.
              </p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting || !!usernameError}>
              {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
            </Button>
          </section>
        </form>
      </CardContent>
    </Card>
  );
}
