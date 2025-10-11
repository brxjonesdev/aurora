// app/api/albums/[mbid]/tracks/route.ts
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { mbid: string } }) {
  const mbid = params.mbid;
  const url = `https://musicbrainz.org/ws/2/release-group/${mbid}?inc=releases+media+recordings&fmt=json`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'CratesApp/1.0.0 ( your-email@example.com )', // MusicBrainz recommends this format
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `HTTP ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch album tracks' }, { status: 500 });
  }
}
