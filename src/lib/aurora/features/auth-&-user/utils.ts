/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function getUserProfile({
  supabase,
}: {
  supabase: SupabaseClient<any, 'public', 'public', any, any>;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  return { user, profile };
}

export async function checkAuthenticated({
  supabase,
  username,
}: {
  supabase: SupabaseClient<any, 'public', 'public', any, any>;
  username?: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/aurora/auth');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profile || (username && profile.username !== username)) {
    redirect('/auth');
  }
}
