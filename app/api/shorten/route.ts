import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  const { original_url } = await request.json();

  if (!original_url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const short_code = nanoid(10);

  try {
    const result = await pool.query(
      'INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING short_code',
      [original_url, short_code]
    );

    return NextResponse.json({ short_code: result.rows[0].short_code }, { status: 201 });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
