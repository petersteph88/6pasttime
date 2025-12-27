"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sparkles, Heart } from "lucide-react";
import { useState } from "react";

// Force dynamic rendering (no static prerender — needed for auth + API)
export const dynamic = "force-dynamic";

export default function Home() {
  const { data: session, status } = useSession();
  const [tweetCards, setTweetCards] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTopTweets = async () => {
    setLoading(true);
    setTweetCards([]);

    try {
      const res = await fetch("/api/top-tweets");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (data.tweets && data.tweets.length > 0) {
        const cards = data.tweets.map((tweet: any) => 
          `https://www.postel.app/api/tweet/screenshot?url=https://x.com/i/status/${tweet.id}&theme=dark`
        );
        setTweetCards(cards);
      } else {
        alert("No tweets found in 2025 — try posting more! 😄");
      }
    } catch (err) {
      alert("Error loading tweets — try again");
    }

    setLoading(false);
  };

  const pay1Dollar = () => window.location.href = "https://nowpayments.io/payment/?iid=6024323253";
  const pay5Dollar = () => window.location.href = "YOUR_5_DOLLAR_LINK_HERE";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Your X decade wrapped — real tweet visuals</p>

        {status === "loading" && <p>Loading...</p>}

        {!session ? (
          <button
            onClick={() => signIn("twitter")}
            className="px-20 py-12 text-3xl font-bold bg-black border-4 border-white rounded-3xl hover:scale-105 transition shadow-2xl"
          >
            Connect X to See Your Preview
          </button>
        ) : (
          <div className="space-y-8">
            <p className="text-xl">Connected as @{session.user?.name}</p>
            <button
              onClick={fetchTopTweets}
              disabled={loading}
              className="px-20 py-10 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-105 transition shadow-2xl disabled:opacity-50"
            >
              {loading ? "Loading Your Top Tweets..." : "Generate My X Preview"}
            </button>
            <button onClick={() => signOut()} className="text-sm underline">Sign out</button>
          </div>
        )}

        {tweetCards.length > 0 && (
          <div className="mt-12 space-y-12 max-w-4xl mx-auto">
            <p className="text-3xl font-bold">Your Top Engaged Tweets (2025) 🔥</p>
            {tweetCards.map((card, i) => (
              <img key={i} src={card} alt={`Top tweet ${i+1}`} className="mx-auto rounded-2xl shadow-2xl max-w-full border-4 border-white" />
            ))}
            <p className="text-xl mt-8">
              Real screenshots from your account!<br/>
              Premium unlocks full PDF + decade insights.
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