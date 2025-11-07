import React from 'react';
import ManuscriptMenubar from '@/lib/aurora/features/manuscript/components/dashboard/menubar/menubar';
import { redirect } from 'next/navigation';
import ManuscriptDashboard from '@/lib/aurora/features/manuscript/components/dashboard/manuscript-dashboard';
import { createClient } from '@/lib/supabase/server';
import { checkAuthenticated } from '@/lib/aurora/features/auth-&-user/utils';

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
