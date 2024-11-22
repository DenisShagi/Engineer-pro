import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/prisma'; // Подключаем Prisma Client

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, username, password, firstName, lastName, phoneNumber } =
      body;

    // Проверяем, что все обязательные данные есть
    if (
      !email ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    // Проверяем, существует ли пользователь с таким email или username
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists.' },
        { status: 400 },
      );
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём нового пользователя
    const newUser = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully.', user: newUser },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during registration.' },
      { status: 500 },
    );
  }
}
