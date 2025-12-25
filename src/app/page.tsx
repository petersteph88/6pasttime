"use client";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [spotifyName, setSpotifyName] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [previewLinks, setPreviewLinks] = useState<string[]>([]);

  const generatePreview = () => {
    const links = [];

    if (spotifyName.trim()) {
      links.push(`Spotify Stats: https://www.statsforspotify.com/profile/${spotifyName.trim()}`);
      links.push(`Receiptify PDF: https://receiptify.herokuapp.com/?username=${spotifyName.trim()}`);
    }

    if (xUsername.trim()) {
      const cleanX = xUsername.replace("@", "").trim();
      links.push(`X Profile: https://x.com/${cleanX}`);
    }

    if (links.length === 0) {
      alert("Enter at least one name/username!");
      return;
    }

    setPreviewLinks(links);
  };

  // Your NOWPayments links
  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=4808621061"; // Replace when created

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Your Spotify + X decade wrapped — preview free</p>

        <div className="space-y-8 mt-12">
          <input
            type="text"
            placeholder="Spotify display name (e.g. peter123)"
            value={spotifyName}
            onChange={(e) => setSpotifyName(e.target.value)}
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
            onClick={generatePreview}
            className="px-20 py-10 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-105 transition shadow-2xl"
          >
            <Eye className="inline mr-4" size={40} /> Preview My Decade Free
          </button>
        </div>

        {previewLinks.length > 0 && (
          <div className="mt-12 p-8 bg-black/50 rounded-3xl max-w-2xl mx-auto space-y-4">
            <p className="text-2xl font-bold">Your Preview Links:</p>
            {previewLinks.map((link, i) => (
              <a key={i} href={link} target="_blank" className="block text-lg underline hover:text-pink-300">
                {link}
              </a>
            ))}
            <p className="text-lg mt-6">Love it? Unlock premium below!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
          <button onClick={pay1Dollar} className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl">
            <Sparkles className="inline mr-4" size={48} /> $1 – Unlock Premium
          </button>

          <button onClick={pay5Dollar} className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl">
            <Heart className="inline mr-4" size={48} /> $5 – Ultimate Edition
          </button>
        </div>

        <p className="text-xl opacity-70 mt-16">Global payments • Instant preview • Live now!</p>
      </div>
    </div>
  );
}