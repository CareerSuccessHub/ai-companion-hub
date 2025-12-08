"use client";

import { Coffee, Heart } from "lucide-react";

export default function KofiButton() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-900 rounded-lg border border-slate-800">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Support This Project
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Help keep this free for students! Every donation helps maintain and improve our AI mentor.
        </p>
      </div>
      
      <a
        href="https://ko-fi.com/YOUR_KOFI_USERNAME"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Coffee className="w-5 h-5" />
        Buy Me a Coffee
      </a>
      
      <p className="text-xs text-gray-500 text-center">
        All donations go toward server costs, AI API fees, and new features ❤️
      </p>
    </div>
  );
}
