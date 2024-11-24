import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // Если токен валиден, пропускаем запрос
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 },
    );
  }
}

// Указываем, какие пути защищены
export const config = {
  matcher: ['/api/protected-route/:path*'], // Замените на ваши маршруты
};
