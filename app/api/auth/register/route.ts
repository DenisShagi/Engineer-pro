// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      username,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
    } = body;

    // Удаляем все нецифровые символы из номера телефона
    const rawPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (
      !email ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !rawPhoneNumber ||
      !address
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём нового пользователя с обработанным номером телефона
    const newUser = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber: rawPhoneNumber,
        address,
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
