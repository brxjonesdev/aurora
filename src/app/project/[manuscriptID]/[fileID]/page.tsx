import { checkAuthenticated } from '@/lib/apricity/core/features/auth-&-user/utils';
import ApricityWorkspace from '@/lib/apricity/core/features/file-system/editor/workspace';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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
    <ApricityWorkspace
    // file={result.data}
    // manuscriptID={manuscriptID}
    />
  );
}
