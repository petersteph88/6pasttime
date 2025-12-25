"use client";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [spotifyName, setSpotifyName] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [preview, setPreview] = useState("");

  const generatePreview = () => {
    if (!spotifyName && !xUsername) {
      alert("Enter at least one name/username for preview!");
      return;
    }

    let message = "Your 6 Past Time Decade Preview 🔥\n\n";

    if (spotifyName.trim()) {
      message += `Spotify All-Time Stats: https://www.statsforspotify.com/profile/${spotifyName.trim()}\n`;
      message += `Receiptify Top 10 PDF: https://receiptify.herokuapp.com/?username=${spotifyName.trim()}\n\n`;
    }

    if (xUsername.trim()) {
      const cleanX = xUsername.replace("@", "").trim();
      message += `X Profile + Tweets: https://x.com/${cleanX}\n\n`;
    }

    message += "Love it? Unlock premium features below!";

    setPreview(message);
  };

  // Your NOWPayments links (replace $5 when created)
  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=4808621061";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Preview your decade wrapped — free. Upgrade for premium.</p>

        <div className="space-y-8 mt-12">
          <input
            type="text"
            placeholder="Spotify display name (e.g. peter123)"
            value={spotifyName}
            onChange={(e) => setSpotifyName(e.target.value)}
            className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
          />
          <p className="text-gray-400 text-sm">From your Spotify profile URL</p>

          <input
            type="text"
            placeholder="X @username (optional)"
            value={xUsername}
            onChange={(e) => setXUsername(e.target.value)}
            className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
          />

          <button
            onClick={generatePreview}
            className="px-20 py-10 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-105 transition shadow-2xl"
          >
            <Eye className="inline mr-4" size={40} /> Preview My Decade Free
          </button>
        </div>

        {preview && (
          <div className="mt-12 p-8 bg-black/50 rounded-3xl max-w-2xl mx-auto">
            <pre className="text-left whitespace-pre-wrap text-lg">{preview}</pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
          <button
            onClick={pay1Dollar}
            className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Sparkles className="inline mr-4" size={48} /> $1 – Unlock Premium
          </button>

          <button
            onClick={pay5Dollar}
            className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Heart className="inline mr-4" size={48} /> $5 – Ultimate Edition
          </button>
        </div>

        <p className="text-xl opacity-70 mt-16">Global cards accepted • Live now!</p>
      </div>
    </div>
  );
}