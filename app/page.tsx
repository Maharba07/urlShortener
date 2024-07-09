'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [url, setUrl] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original_url: url }),
    });

    if (res.ok) {
      const data = await res.json();
      setShortCode(data.short_code);
    } else {
      console.error('Error shortening URL');
    }
  };

  return (
    <div className="container mx-auto p-4 m-10">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="border p-2 mr-2"
          required
        />
        <button className="btn btn-primary">Convert</button>
      </form>
      {shortCode && (
        <div>
          <p>Shortened URL:</p>
          <a href={`/${shortCode}`} className="text-blue-500">{`${shortCode}`}</a>
        </div>
      )}
    </div>
  );
}
