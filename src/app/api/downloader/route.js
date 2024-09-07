import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
    }

    const videoId = new URL(url).searchParams.get('v');
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.filterFormats(info.formats, 'video')[0]; // Take the first video format

    return NextResponse.json({ downloadUrl: format.url });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return NextResponse.json({ error: 'Failed to retrieve video information' }, { status: 500 });
  }
}
