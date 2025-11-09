
import { checkAuthenticated } from '@/lib/apricity/core/features/auth-&-user/utils';
import { createClient } from '@/lib/supabase/server';
import React from 'react'

export default async function ManuscriptNoFile({ params }: {
  params: Promise<{ username: string; manuscriptID: string }>;
}) {
  const supabase = await createClient();
  const { username } = await params;
  await checkAuthenticated({ supabase, username });
  return (
    <div>ManuscriptNoFile</div>
  )
}
