import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(request: Request) {
  try {
    // Извлекаем токен из заголовка Authorization
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Проверяем и декодируем токен
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // Ищем пользователя по ID, извлечённому из токена
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Возвращаем данные пользователя
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /api/users/me:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
