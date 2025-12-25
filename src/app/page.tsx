"use client";
import { Sparkles, Heart } from "lucide-react";

export default function Home() {
  // NOWPayments $1 link (you have this)
  const basicLink = "https://nowpayments.io/payment/?iid=6024323253";

  // Replace this with your actual $5 link once created
  const premiumLink = "https://nowpayments.io/payment/?iid=4808621061";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Your entire decade. One click. Pure clarity.</p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
          <button
            onClick={() => window.location.href = basicLink}
            className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Sparkles className="inline mr-4" size={48} /> $1 – Instant Report
          </button>

          <button
            onClick={() => window.location.href = premiumLink}
            className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Heart className="inline mr-4" size={48} /> $5 – Premium Report
          </button>
        </div>

        <p className="text-xl opacity-70 mt-16">First 10 000 only – live now!</p>
      </div>
    </div>
  );
}