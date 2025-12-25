"use client";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [spotifyUsername, setSpotifyUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [receiptifyImg, setReceiptifyImg] = useState("");
  const [statsUrl, setStatsUrl] = useState("");
  const [xProfileUrl, setXProfileUrl] = useState("");

  const generatePreview = () => {
    const cleanSpotify = spotifyUsername.trim();
    const cleanX = xUsername.replace("@", "").trim();

    if (!cleanSpotify && !cleanX) {
      alert("Enter at least one username!");
      return;
    }

    if (cleanSpotify) {
      // Receiptify direct image (top 10 all-time)
      setReceiptifyImg(`https://receiptify.herokuapp.com/receipt/${cleanSpotify}/alltime/top10.png`);
      setStatsUrl(`https://www.statsforspotify.com/profile/${cleanSpotify}`);
    } else {
      setReceiptifyImg("");
      setStatsUrl("");
    }

    if (cleanX) {
      setXProfileUrl(`https://x.com/${cleanX}`);
    } else {
      setXProfileUrl("");
    }
  };

  // NOWPayments links
  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=4808621061";

  return (
    <>
      <head>
        <title>Decade Memoirs</title>
      </head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
          <p className="text-2xl md:text-4xl opacity-90">See a real visual preview of your decade wrapped — free</p>

          <div className="space-y-8 mt-12">
            <div>
              <input
                type="text"
                placeholder="Spotify username (e.g. 1214368564)"
                value={spotifyUsername}
                onChange={(e) => setSpotifyUsername(e.target.value)}
                className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
              />
              <p className="text-gray-400 text-sm mt-2">From Spotify profile URL (after /user/)</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="X @username (optional)"
                value={xUsername}
                onChange={(e) => setXUsername(e.target.value)}
                className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
              />
            </div>

            <button
              onClick={generatePreview}
              className="px-20 py-10 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-105 transition shadow-2xl"
            >
              <Eye className="inline mr-4" size={40} /> Preview My Decade Free
            </button>
          </div>

          {(receiptifyImg || statsUrl || xProfileUrl) && (
            <div className="mt-12 space-y-8 max-w-4xl mx-auto">
              <p className="text-2xl font-bold">Your Real Decade Preview 🔥</p>

              {receiptifyImg && (
                <div>
                  <p className="text-lg mb-4">Spotify Top Tracks Receipt (visual sample):</p>
                  <img src={receiptifyImg} alt="Spotify Receipt Preview" className="mx-auto rounded-2xl shadow-2xl max-w-full" />
                </div>
              )}

              {statsUrl && (
                <a href={statsUrl} target="_blank" className="block text-lg underline hover:text-pink-300">
                  Open Full Spotify Stats Page (top 50 tracks/artists)
                </a>
              )}

              {xProfileUrl && (
                <a href={xProfileUrl} target="_blank" className="block text-lg underline hover:text-pink-300">
                  Open X Profile (scroll for tweet history)
                </a>
              )}

              <p className="text-lg mt-8">This is a real sample of your music decade!<br/>Upgrade for custom PDF bundle + more visuals.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
            <button onClick={pay1Dollar} className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl">
              <Sparkles className="inline mr-4" size={48} /> $1 – Unlock Premium Bundle
            </button>

            <button onClick={pay5Dollar} className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl">
              <Heart className="inline mr-4" size={48} /> $5 – Ultimate Decade Edition
            </button>
          </div>

          <p className="text-xl opacity-70 mt-16">Global payments • Real previews • Live now!</p>
        </div>
      </div>
    </>
  );
}