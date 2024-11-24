import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '@/lib/prisma'; // Подключаем Prisma Client

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Секрет для токена

if (!JWT_SECRET) {
  throw new Error(
    'JWT_SECRET is not defined. Please add it to your .env file.',
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    // Ищем пользователя по email
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      // Email не существует
      return NextResponse.json(
        { error: 'Incorrect email or password.', field: 'email' },
        { status: 401 },
      );
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Пароль неверный
      return NextResponse.json(
        { error: 'Incorrect password.', field: 'password' },
        { status: 401 },
      );
    }

    // Генерируем токен
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json(
      { message: 'Login successful.', token },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during login.' },
      { status: 500 },
    );
  }
}
