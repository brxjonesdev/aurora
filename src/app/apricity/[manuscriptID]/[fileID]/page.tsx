import { checkAuthenticated } from '@/lib/apricity/core/features/auth-&-user/utils';
import ManuscriptDashboard from '@/lib/apricity/core/features/manuscript/components/dashboard/manuscript-dashboard';
import ManuscriptMenubar from '@/lib/apricity/core/features/manuscript/components/dashboard/menubar/menubar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ManuscriptPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; manuscriptID: string; file: string }>;
  searchParams: Promise<{ view: 'editor' | 'cards' }>;
}) {
  const { username, manuscriptID, file } = await params;
  const { view } = await searchParams;
  const supabase = await createClient();
  await checkAuthenticated({ supabase, username });
  if (!view) {
    redirect(`?view=cards`);
  }

  // const result = await manuscriptService.getManuscriptFile(manuscriptID, file);
  // if (!result.ok) {
  //   redirect(`/aurora/${username}/${manuscriptID}`);
  // }/


  return (
    <section className="flex flex-1 flex-col gap-2 p-4">
      <ManuscriptMenubar fileName={file} />
      <ManuscriptDashboard file={file} defaultView={view ?? 'cards'} />
    </section>
  );
}
