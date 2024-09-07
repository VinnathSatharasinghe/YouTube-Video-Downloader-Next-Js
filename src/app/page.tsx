"use client";

import { useState } from 'react';

export default function Home() {
  const [videoLink, setVideoLink] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const longUrlPattern = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

    const shortMatch = url.match(shortUrlPattern);
    const longMatch = url.match(longUrlPattern);

    if (shortMatch) {
      return shortMatch[1];
    } else if (longMatch) {
      return longMatch[1];
    }
    return null;
  };

  const handleDownload = async () => {
    try {
      setError(null);
      const videoId = extractVideoId(videoLink);
      if (!videoId) {
        setError('Invalid YouTube URL');
        return;
      }
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setEmbedUrl(embedUrl);
      setVideoId(videoId);
    } catch (err) {
      console.error('Error during processing:', err);
      setError('Failed to process video. Please check the URL or try again later.');
    }
  };

  const handleDownloadClick = async () => {
    if (!videoId) {
      setError('No video selected for download.');
      return;
    }

    try {
      const response = await fetch(`/api/downloader?url=https://www.youtube.com/watch?v=${videoId}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = `${videoId}.mp4`;
      link.click();
    } catch (err) {
      console.error('Error during download:', err);
      setError('Failed to download video. Please try again later.');
    }
  };

  return (
    <main className="mx-auto md:max-w-6xl px-4">
      <header className="flex justify-between mx-auto max-w-6xl py-4">
        <div>
          <h2 className="text-xl font-semibold tracking-wider">
            YouTube Downloader
          </h2>
        </div>
        <div>
          <p>Share Now</p>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[450px] rounded-[100px] bg-red-500">
        <h3 className="text-2xl font-semibold text-white">YouTube Video Downloader</h3>
        <div className="mt-4 space-x-2 w-full p-4 flex justify-center">
          <input
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            type="text"
            className="p-2 w-[60%] outline-none text-black"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ"
          />
          <button
            onClick={handleDownload}
            className="border rounded-md py-1 px-4 font-semibold bg-blue-500 text-white hover:bg-blue-700"
          >
            Convert
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {embedUrl && (
        <div className="bg-black mt-4 p-4">
          <iframe
            src={embedUrl}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
          <div className="mt-2 flex justify-between">
            <button
              onClick={handleDownloadClick}
              className="border rounded-md py-1 px-4 font-semibold bg-green-500 text-white hover:bg-green-700"
            >
              Download Video
            </button>
            {/* Custom controls */}
            <div className="custom-controls flex justify-between mt-2">
              <button
                onClick={() => {
                  const video = document.querySelector('iframe') as HTMLIFrameElement;
                  if (video) {
                    const videoElement = video.contentWindow?.document.querySelector('video') as HTMLVideoElement;
                    if (videoElement) videoElement.play();
                  }
                }}
                className="border rounded-md py-1 px-4 font-semibold bg-gray-500 text-white hover:bg-gray-700"
              >
                Play
              </button>
              <button
                onClick={() => {
                  const video = document.querySelector('iframe') as HTMLIFrameElement;
                  if (video) {
                    const videoElement = video.contentWindow?.document.querySelector('video') as HTMLVideoElement;
                    if (videoElement) videoElement.pause();
                  }
                }}
                className="border rounded-md py-1 px-4 font-semibold bg-gray-500 text-white hover:bg-gray-700"
              >
                Pause
              </button>
              <button
                onClick={() => {
                  const video = document.querySelector('iframe') as HTMLIFrameElement;
                  if (video) {
                    const videoElement = video.contentWindow?.document.querySelector('video') as HTMLVideoElement;
                    if (videoElement) videoElement.currentTime -= 10;
                  }
                }}
                className="border rounded-md py-1 px-4 font-semibold bg-gray-500 text-white hover:bg-gray-700"
              >
                Rewind 10s
              </button>
              <button
                onClick={() => {
                  const video = document.querySelector('iframe') as HTMLIFrameElement;
                  if (video) {
                    const videoElement = video.contentWindow?.document.querySelector('video') as HTMLVideoElement;
                    if (videoElement) videoElement.currentTime += 10;
                  }
                }}
                className="border rounded-md py-1 px-4 font-semibold bg-gray-500 text-white hover:bg-gray-700"
              >
                Forward 10s
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
