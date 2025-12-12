// src/app/page.tsx
"use client";
import { Sparkles, Heart } from "lucide-react";

export default function Home() {
  const checkout = async (priceId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ priceId }),
      headers: { "Content-Type": "application/json" },
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-5xl">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight">6 Past Time</h1>
        <p className="text-2xl md:text-4xl opacity-90">Your entire decade. One click. Pure clarity.</p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-20">
          <button
            onClick={() => checkout("price_1SdV5SGYYsllPGUEtfBCLfZm")}
            className="px-16 py-12 text-3xl font-bold bg-white text-black rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Sparkles className="inline mr-4" size={48} /> $1 – Instant PDF
          </button>

          <button
            onClick={() => checkout("price_1SdV6AGYYsllPGUEG9vaPwPV")}
            className="px-16 py-12 text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl hover:scale-110 transition shadow-2xl"
          >
            <Heart className="inline mr-4" size={48} /> $5 – Video + Shareables
          </button>
        </div>

        <p className="text-xl opacity-70 mt-16">First 10 000 only – launching in hours</p>
      </div>
    </div>
  );
}