import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phoneNumber = searchParams.get('phoneNumber');

  if (!phoneNumber) {
    return NextResponse.json(
      { error: 'Phone number is required' },
      { status: 400 },
    );
  }

  // Удаляем все нецифровые символы
  const rawPhoneNumber = phoneNumber.replace(/\D/g, '');

  const user = await prisma.users.findUnique({
    where: { phoneNumber: rawPhoneNumber },
  });

  return NextResponse.json({ exists: !!user });
}
