import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 },
    );
  }

  const user = await prisma.users.findUnique({
    where: { username },
  });

  return NextResponse.json({ exists: !!user });
}
