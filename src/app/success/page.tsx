"use client";

export default function Success() {
  const instagramLogin = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=YOUR_INSTAGRAM_APP_ID&redirect_uri=https://your-vercel-url.vercel.app/auth/callback&scope=user_profile,user_media&response_type=code`;
  };

  const spotifyLogin = () => {
    const scopes = "user-top-read user-read-private user-read-email playlist-read-private";
    window.location.href = `https://accounts.spotify.com/authorize?client_id=5f2522dd8cc14e7c893da9422da057c5&response_type=code&redirect_uri=https://your-vercel-url.vercel.app/auth/callback&scope=${encodeURIComponent(scopes)}`;
  };

  const twitterLogin = () => {
    window.location.href = "https://twitter.com/i/oauth2/authorize?client_id=OW1fblhVeXdWdm1BNzEzTDlvaUU6MTpjaQ&response_type=code&redirect_uri=https://your-vercel-url.vercel.app/auth/callback&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center space-y-12 max-w-4xl">
        <h1 className="text-6xl font-bold">Payment successful!</h1>
        <p className="text-3xl">Connect in one click — we pull your full decade instantly</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
          <button onClick={instagramLogin} className="py-12 text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl hover:scale-110 transition">
            Instagram
          </button>

          <button onClick={spotifyLogin} className="py-12 text-3xl font-black bg-green-600 rounded-3xl hover:scale-110 transition">
            Spotify
          </button>

          <button onClick={twitterLogin} className="py-12 text-3xl font-black bg-black border-4 border-white rounded-3xl hover:scale-110 transition">
            X / Twitter
          </button>
        </div>
      </div>
    </div>
  );
}