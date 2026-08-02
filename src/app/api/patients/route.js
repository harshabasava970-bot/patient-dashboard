import { NextResponse } from 'next/server';

/**
 * GET /api/patients
 *
 * Server-side proxy for the Coalition Technologies Patient Data API.
 * Keeping the fetch here (rather than in the browser) means the Basic Auth
 * credentials never reach the client bundle — only this route reads
 * process.env.API_USERNAME / API_PASSWORD.
 *
 * API docs: https://documenter.getpostman.com/view/11861104/2sA35G42ve
 * Auth:     Basic Auth — username: coalition, password: skills-test
 */
export async function GET() {
  const baseUrl = process.env.API_BASE_URL;
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  if (!baseUrl || !username || !password) {
    return NextResponse.json(
      {
        error:
          'API is not configured. Copy .env.local.example to .env.local and fill in the values.',
      },
      { status: 500 }
    );
  }

  const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

  try {
    const upstreamResponse = await fetch(baseUrl, {
      headers: {
        Authorization: authHeader,
      },
      cache: 'no-store',
    });

    if (upstreamResponse.status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed. Check API_USERNAME and API_PASSWORD in .env.local.' },
        { status: 401 }
      );
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: `Upstream API responded with ${upstreamResponse.status}` },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to reach the Patient Data API. Check your network connection.',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}
