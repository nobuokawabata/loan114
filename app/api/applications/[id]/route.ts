import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jsonFilePath = path.join(process.cwd(), 'data', 'applications.json');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const applications = JSON.parse(fileContents);
    const application = applications.find((app: any) => app.id === parseInt(params.id, 10));

    if (application) {
      return NextResponse.json(application);
    } else {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error reading applications.json:', error);
    return NextResponse.json({ error: 'Failed to load application data' }, { status: 500 });
  }
}
