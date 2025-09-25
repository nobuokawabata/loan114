import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jsonFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const reviews = JSON.parse(fileContents);
    const review = reviews.find((rev: any) => rev.id === parseInt(params.id, 10));

    if (review) {
      return NextResponse.json(review);
    } else {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading reviews.json:', error);
    return NextResponse.json({ error: 'Failed to load review data' }, { status: 500 });
  }
}
