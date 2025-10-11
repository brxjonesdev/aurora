import React from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ story: string; view: string }>;
}) {
  const { story, view } = await params;
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
      <h1>{`Story: ${story}, View: ${view}`}</h1>
    </section>
  );
}
