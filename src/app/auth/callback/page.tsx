"use client";
import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      alert(`Error: ${error}`);
      return;
    }

    if (code) {
      navigator.clipboard.writeText(code);
      alert(`SUCCESS! Code copied to clipboard.\nPaste it into the pull script on your computer.\nYour decade data will download instantly.`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl text-center p-8">
      Processing... <br/><br/> If nothing happens, check popup blocker.
    </div>
  );
}