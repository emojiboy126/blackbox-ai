"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <head>
        <title>ChatGPT Clone</title>
        <meta name="description" content="ChatGPT clone with AI profiles and themes" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-yellowAccentDark transition-colors duration-300`}>
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-yellowAccentDark">
          <h1 className="text-2xl font-bold">ChatGPT Clone</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-yellowAccentLight dark:bg-yellowAccentDark text-black dark:text-white font-semibold transition-colors duration-300"
            aria-label="Toggle light/dark mode"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </header>
        <main className="p-4 min-h-[calc(100vh-64px)]">{children}</main>
      </body>
    </html>
  );
}
