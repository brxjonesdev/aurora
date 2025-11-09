import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import React from 'react';
import CreateStory from '@/app/apricity/home/_components/create-story';
import { createClient } from '@/lib/supabase/server';
import StoryErrorView from './_components/error';
import { createServices } from '@/lib/apricity/core/services/createServices';
import { getUserProfile } from '@/lib/apricity/core/features/auth-&-user/utils';
import CreateProfile from '@/lib/apricity/core/features/onboarding/components/create-profile';
import Stories from './_components/stories';


export const dynamic = 'force-dynamic';


export default async function Homepage() {
  const { storyService } = createServices();
  const supabase = await createClient();
  const { user, profile } = await getUserProfile({ supabase });

  if (!profile) {
    return (
      <section className="flex w-full flex-1 items-center justify-center gap-0 px-8 py-4">
        <CreateProfile userId={user.id} initialFullName={user.user_metadata.full_name} />
      </section>
    );
  }

  const username = profile.username || '';

  const result = await storyService.getUsersStories(user.id);
  if (!result.ok) {
    return <StoryErrorView errorMessage={result.error.message} />;
  }

  const userStories= result.data;
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
      <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
        <CardHeader className="gap-0 p-4">
          <CardTitle className="text-md font-medium">Your Stories</CardTitle>
          <CardDescription className="text-sm">Create and manage your stories.</CardDescription>
          <CardAction>
            <CreateStory userId={user.id} username={username} />
          </CardAction>
        </CardHeader>
        <CardContent className="bg-secondary flex flex-1 flex-col gap-4 rounded-b-lg p-4 lg:flex-row">
          <Stories stories={userStories} username={username} />
        </CardContent>
      </Card>
    </section>
  );
}
