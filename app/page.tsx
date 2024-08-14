"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortCode, setShortCode] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ original_url: formattedUrl }),
    });

    if (res.ok) {
      const data = await res.json();
      setShortCode(data.short_code);
    } else {
      console.error("Error shortening URL");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="border p-2 mr-2 w-full mb-4"
            required
          />
          <button className="btn btn-primary w-full">Convert</button>
        </form>
        {shortCode && (
          <div className="text-center">
            <p>Shortened URL:</p>
            <a href={`/${shortCode}`} className="text-blue-500 break-all">
              {`${shortCode}`}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
