'use server';

import pool from '../../lib/db';
import Redirect from './redirect';

interface Params {
  short_code: string;
}

export default async function ShortCodePage({ params }: { params: Params }) {
  const { short_code } = params;

  try {
    const result = await pool.query(
      'SELECT original_url FROM urls WHERE short_code = $1',
      [short_code]
    );

    if (result.rows.length > 0) {
      const original_url = result.rows[0].original_url;
      return <Redirect url={original_url} />;
    } else {
      console.log('URL not found in database');
      return <p>URL not found</p>;
    }
  } catch (err) {
    console.error('Error querying the database:', err);
    return <p>Error retrieving URL</p>;
  }
}
