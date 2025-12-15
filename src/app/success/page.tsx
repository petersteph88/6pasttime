"use client";

import { useState } from "react";

export default function Success() {
  const [spotifyUsername, setSpotifyUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  const generateReport = () => {
    if (!spotifyUsername && !xUsername) {
      alert("Enter at least one username!");
      return;
    }

    // Free public tools for instant Spotify stats (2025 working links)
    const spotifyStats = spotifyUsername 
      ? `https://statsforspotify.com/#${spotifyUsername}` // Top tracks/artists all-time
      : "";
    const receiptify = spotifyUsername 
      ? `https://receiptify.herokuapp.com/?username=${spotifyUsername}` // Fun receipt PDF
      : "";

    // X public profile
    const xProfile = xUsername ? `https://x.com/${xUsername.replace("@", "")}` : "";

    // Simple combined "report" – opens tools + profile
    const message = `Your 6 Past Time Decade Report is ready!\n\n` +
      (spotifyStats ? `Spotify All-Time Stats: ${spotifyStats}\nReceiptify Top 10: ${receiptify}\n\n` : "") +
      (xProfile ? `X Profile + Tweets: ${xProfile}\n\n` : "") +
      `Screenshot these pages + combine for your shareable Wrapped!\n\nPro tip: Use free tools like Kapwing Spotify Wrapped template to make it beautiful.`;

    alert(message);
    // For real PDF: In future, use html2pdf.js to capture
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center space-y-12 max-w-4xl">
        <h1 className="text-6xl font-bold">Instant Decade Report!</h1>
        <p className="text-3xl">Enter usernames below — generate in seconds</p>

        <div className="space-y-8 mt-20">
          <input
            type="text"
            placeholder="Spotify username (optional)"
            value={spotifyUsername}
            onChange={(e) => setSpotifyUsername(e.target.value)}
            className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
          />
          <input
            type="text"
            placeholder="X @username (optional)"
            value={xUsername}
            onChange={(e) => setXUsername(e.target.value)}
            className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
          />

          <button
            onClick={generateReport}
            className="px-20 py-10 text-4xl font-black bg-gradient-to-r from-green-600 to-purple-600 rounded-3xl hover:scale-110 transition"
          >
            Generate Now
          </button>
        </div>

        <p className="text-xl text-gray-400 mt-16">
          At least one username required • Results open instantly • Screenshot & share!
        </p>
      </div>
    </div>
  );
}