import React from 'react';

export default async function StorySettings({
  params,
}: {
  params: Promise<{ story: string; id: string }>;
}) {
  const { story, id } = await params;
  return (
    <div>
      StorySettings for {story} (ID: {id})
    </div>
  );
}
