"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [videoLink, setVideoLink] = useState<string>('');
  const [finalLink, setFinalLink] = useState<string | null>(null);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setError(null);
      const response = await axios.get(`/api/downloader?url=${encodeURIComponent(videoLink)}`);
      const { url } = response.data;

      if (url) {
        setFinalLink(url);
        setShowDownload(true);
      } else {
        throw new Error('No video URL returned');
      }
    } catch (err) {
      console.error('Error during download:', err);
      setError('Failed to retrieve video. Please check the URL or try again later.');
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
            placeholder="https://youtu.be/Lq9ZMwqqr9U"
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
      {showDownload && finalLink && (
        <div className="bg-black mt-4 p-4">
          <video src={finalLink} controls className="w-full h-auto"></video>
        </div>
      )}
    </main>
  );
}
