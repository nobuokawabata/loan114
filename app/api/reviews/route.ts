import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const jsonFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading reviews.json:', error);
    return NextResponse.json({ error: 'Failed to load reviews data' }, { status: 500 });
  }
}
