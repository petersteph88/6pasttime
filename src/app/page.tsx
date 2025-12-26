"use client";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [spotifyUsername, setSpotifyUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [receiptifyImg, setReceiptifyImg] = useState("");
  const [statsUrl, setStatsUrl] = useState("");
  const [wingAzulUrl, setWingAzulUrl] = useState("");
  const [exampleTweetCard, setExampleTweetCard] = useState("");

  const generatePreview = () => {
    const cleanSpotify = spotifyUsername.trim();
    const cleanX = xUsername.replace("@", "").trim();

    if (!cleanSpotify && !cleanX) {
      alert("Enter at least one username!");
      return;
    }

    setReceiptifyImg("");
    setStatsUrl("");
    setWingAzulUrl("");
    setExampleTweetCard("");

    if (cleanSpotify) {
      setReceiptifyImg(`https://receiptify.herokuapp.com/receipt/${cleanSpotify}/alltime/top10.png`);
      setStatsUrl(`https://www.statsforspotify.com/profile/${cleanSpotify}`);
    }

    if (cleanX) {
      setWingAzulUrl(`https://wingazul.com/sort-tweets?username=${cleanX}`);
      // Example top tweet card (replace with real if user pastes tweet URL later)
      setExampleTweetCard("https://orshot.com/api/tweet-image?url=https://x.com/elonmusk/status/example"); // Placeholder
    }
  };

  // NOWPayments links
  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=4808621061";

  return (
    <>
      <head>
        <title>6 Past Time - Decade Memoirs</title>
      </head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
        <div className="text-center space-y-12 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
          <p className="text-2xl md:text-4xl opacity-90">Instant real visuals from your accounts — free preview</p>

          <div className="space-y-8 mt-12">
            <div>
              <input
                type="text"
                placeholder="Spotify username (from profile URL)"
                value={spotifyUsername}
                onChange={(e) => setSpotifyUsername(e.target.value)}
                className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="X @username (e.g. @yourhandle)"
                value={xUsername}
                onChange={(e) => setXUsername(e.target.value)}
                className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
              />
            </div>

            <button
              onClick={generatePreview}
              className="px-20 py-10 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-105 transition shadow-2xl"
            >
              <Eye className="inline mr-4" size={40} /> Generate Instant Preview
            </button>
          </div>

          {(receiptifyImg || statsUrl || wingAzulUrl) && (
            <div className="mt-12 space-y-12 max-w-4xl mx-auto">
              <p className="text-3xl font-bold">Your Real Decade Preview 🔥</p>

              {receiptifyImg && (
                <div className="space-y-4">
                  <p className="text-xl">Your Spotify Top Tracks Receipt:</p>
                  <img src={receiptifyImg} alt="Top tracks" className="mx-auto rounded-2xl shadow-2xl max-w-full border-4 border-white" />
                </div>
              )}

              {statsUrl && (
                <a href={statsUrl} target="_blank" className="block text-xl underline hover:text-pink-300">
                  Open Your Full Spotify Stats
                </a>
              )}

              {wingAzulUrl && (
                <div className="space-y-4">
                  <p className="text-xl">Your Top Engaged Tweets (past year):</p>
                  <a href={wingAzulUrl} target="_blank" className="block text-lg underline hover:text-pink-300">
                    Open WingAzul — see most liked/retweeted tweets
                  </a>
                  <p className="text-lg">Copy any tweet URL → use free tool for beautiful card image</p>
                </div>
              )}

              <p className="text-xl mt-8">
                Real data from your accounts!<br/>
                Premium = custom PDF bundle + more visuals ($1/$5)
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
            <button onClick={pay1Dollar} className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl">
              <Sparkles className="inline mr-4" size={48} /> $1 – Premium Bundle
            </button>

            <button onClick={pay5Dollar} className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl">
              <Heart className="inline mr-4" size={48} /> $5 – Ultimate Edition
            </button>
          </div>
        </div>
      </div>
    </>
  );
}