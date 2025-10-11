import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupID = searchParams.get('release-group');

  if (!groupID) {
    return NextResponse.json({ error: 'Missing release-group' }, { status: 400 });
  }

  try {
    const mbResponse = await fetch(
      `https://musicbrainz.org/ws/2/release?release-group=${groupID}&fmt=json&limit=1`,

      {
        headers: {
          'User-Agent': 'CratesApp/1.0.0',
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!mbResponse.ok) {
      return NextResponse.json(
        { error: `MusicBrainz API Error: ${mbResponse.statusText}` },
        { status: mbResponse.status }
      );
    }

    const data = await mbResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
