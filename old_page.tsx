"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [videoLink, setVideoLink] = useState("");
  const [finalLink, setFinalLink] = useState("");
  const [showDownload, setShowDownload] = useState(false);

  const handelDownload = async () => {
    try {
      const res = await axios.get(`/api/downloader?url=${videoLink}`);
      console.log('Response data:', res.data); // Log the entire response
      setFinalLink(res.data.format.url);
      setShowDownload(true);
    } catch (err) {
      console.error('Error during download:', err); // Log the error
    }
  };

  return (
    <main className="mx-auto md:max-w-6xl px-4">
      <header className="flex justify-between mx-auto max-w-6xl py-4">
        <div>
          <h2 className="text-xl font-semibold tracking-wider">
            Youtube Downloader
          </h2>
        </div>
        <div>
          <p>Share Now</p>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[450px] rounded-[100px] bg-red-500">
        <h3>Youtube Video Downloader</h3>
        <div className="mt-4 space-x-2 w-full p-4 flex justify-center">
          <input
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            type="text"
            className="p-2 w-[60%] outline-none text-black"
            placeholder="https://youtu.be/Lq9ZMwqqr9U"
          />
          <br />
          <button
            onClick={handelDownload}
            className="border rounded-md py-1 px-4 font-semibold"
          >
            Convert
          </button>
        </div>
      </div>
      {showDownload && (
        <div className="bg-black">
          <video src={finalLink} controls width="600"></video>
        </div>
      )}
    </main>
  );
}
