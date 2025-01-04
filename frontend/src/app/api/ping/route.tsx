import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Ping API route called');
  try {
    console.log('Attempting to fetch from backend');
    const response = await fetch('http://backend:8000/ping', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK. Status:', response.status, 'Text:', errorText);
      throw new Error(`Failed to fetch: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in ping API route:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

export async function HEAD() {
  console.log('Health check called');
  return new NextResponse(null, { status: 200 });
}