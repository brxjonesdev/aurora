import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import React from 'react';
import CreateStory from '@/app/aurora/home/_components/create-story';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/lib/shared/components/ui/empty';
import { BookIcon } from 'lucide-react';
import CreateProfile from '@/lib/aurora/features/onboarding/components/create-profile';
import { createServices } from '@/lib/aurora/core/createServices';
import Stories from './_components/stories';



export default async function Homepage() {
  const { storyService } = createServices();
  let username = '';
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/aurora/auth');
  } else {
    // User is authenticated, check if they have a profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    username = profile?.username || '';
    if (profile === null || !profile.onboarded) {
      return (
        <section className="flex w-full flex-1 items-center justify-center gap-0 px-8 py-4">
          <CreateProfile userId={user.id} initialFullName={user.user_metadata.full_name} />
        </section>
      );
    }
  }

  const result = await storyService.getUsersStories(user.id);
  if (!result.ok) {
    return (
      <section className="flex w-full flex-1 gap-0 px-8 py-4">
        <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
          <CardHeader className="gap-0 p-4">
            <CardTitle className="text-md font-medium">Error</CardTitle>
            <CardDescription className="text-sm">
              There was an error loading your stories.
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-secondary flex flex-1 flex-col items-center justify-center gap-4 rounded-b-lg p-4 lg:flex-row">
            <Empty className="w-full max-w-sm border-2">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookIcon />
                </EmptyMedia>
                <EmptyTitle>Unable to load stories</EmptyTitle>
                <EmptyDescription>{result.error.message}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </section>
    );
  }

  const userStories = result.data;

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
          <Stories initialStories={userStories} username={username} />
          {userStories.length === 0 && (
            <section className="flex flex-1 flex-col items-center justify-center">
              <h2>You have no stories yet.</h2>
              <p className="text-muted-foreground">
                Click &quot;Create New Story&quot; to get started!
              </p>
            </section>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
