'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectProps {
  url: string;
}

export default function Redirect({ url }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url);
  }, [url, router]);

  return <p>Redirecting...</p>;
}
