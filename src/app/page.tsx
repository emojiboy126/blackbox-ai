"use client";

import { useState } from "react";
import SettingsModal from "./components/SettingsModal";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-yellowAccentDark">
        <h2 className="text-xl font-semibold">ChatGPT Clone</h2>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2 rounded bg-yellowAccentLight dark:bg-yellowAccentDark text-black dark:text-white font-semibold transition-colors duration-300"
          aria-label="Open settings"
        >
          Settings
        </button>
      </header>

      <main className="mt-6">
        {/* Chat interface placeholder */}
        <div className="border border-gray-300 dark:border-yellowAccentDark rounded p-4 min-h-[400px]">
          <p className="text-center text-gray-500 dark:text-yellowAccentDark">
            Chat interface will be here.
          </p>
        </div>
      </main>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}
