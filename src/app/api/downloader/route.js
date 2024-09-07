import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: "URL parameter is missing" }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const videoFormats = ytdl.filterFormats(info.formats, 'video');
    const format = ytdl.chooseFormat(videoFormats, { quality: 'highest' });

    if (!format.url) {
      return NextResponse.json({ error: "No suitable video format found" }, { status: 404 });
    }

    return NextResponse.json({ url: format.url });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Failed to retrieve video information" }, { status: 500 });
  }
}
