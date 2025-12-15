"use client";

export default function Success() {
  const spotifyLogin = () => {
    const scopes = "user-top-read user-read-private user-read-email";
    window.location.href = `https://accounts.spotify.com/authorize?client_id=5f2522dd8cc14e7c893da9422da057c5&response_type=code&redirect_uri=https://6pasttime-peter-isikos-projects.vercel.app/auth/callback&scope=${encodeURIComponent(scopes)}`;
  };

  const twitterLogin = () => {
    window.location.href = `https://twitter.com/i/oauth2/authorize?client_id=OW1fblhVeXdWdm1BNzEzTDlvaUU6MTpjaQ&response_type=code&redirect_uri=https://6pasttime-peter-isikos-projects.vercel.app/auth/callback&scope=users.read%20tweet.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center space-y-16 max-w-4xl">
        <h1 className="text-7xl font-bold">Payment received!</h1>
        <p className="text-3xl">Connect Spotify or X — your decade report arrives in 24h</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
          <button onClick={spotifyLogin} className="py-16 text-4xl font-black bg-green-600 rounded-3xl hover:scale-110 transition shadow-2xl">
            🎵 Connect Spotify
          </button>

          <button onClick={twitterLogin} className="py-16 text-4xl font-black bg-black border-6 border-white rounded-3xl hover:scale-110 transition shadow-2xl">
            🐦 Connect X
          </button>
        </div>

        <p className="text-xl text-gray-400 mt-20">
          Connect one or both — we’ll email your beautiful 6 Past Time PDF tomorrow
        </p>
      </div>
    </div>
  );
}