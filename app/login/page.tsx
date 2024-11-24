'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import Input from '@/components/Input';
import { loginUser } from '@/utils/api';
import { saveToken, getToken } from '@/utils/auth';

import styles from './login.module.scss';

// Кастомный чекбокс
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: 'rgb(126, 78, 229)',
  '&.Mui-checked': {
    color: 'rgb(126, 78, 229)',
  },
  '&:hover': {
    backgroundColor: 'rgba(126, 78, 229, 0.1)',
  },
}));

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // Общее сообщение об ошибке
  const [hasError, setHasError] = useState(false); // Флаг наличия ошибки
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const sanitizeInput = (value: string): string => {
    // Удаляем русские буквы
    return value.replace(/[А-Яа-яЁё]/g, '');
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    setHasError(false); // Сбрасываем состояние ошибки при изменении ввода
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setHasError(false);

    const { email, password } = formData;

    // Базовая валидация
    if (!email || !password) {
      setError('Please enter your email and password.');
      setHasError(true);
      return;
    }

    try {
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);

      const { token } = data;

      // Сохраняем токен с использованием функции saveToken
      saveToken(token, rememberMe);

      // Редирект на Dashboard
      console.log('Redirecting to dashboard...');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
      setHasError(true);
    }
  };

  return (
    <div className={styles.container}>
      {/* Левая часть с изображением */}
      <div className={styles.container__left}>
        <Image
          src="/images/illustrations/characters/girl.png"
          alt="Girl Illustration"
          width={600}
          height={400}
          priority
        />
        <Image
          src="/images/illustrations/objects/tree-2.png"
          alt="Tree Illustration"
          width={150}
          height={150}
          className={styles['container__left-tree']}
        />
      </div>

      {/* Правая часть с формой */}
      <div className={styles.container__right}>
        <div className={styles.form}>
          <h1 className={styles.form__title}>Welcome to Tecnolog! 👋</h1>
          <p className={styles.form__subtitle}>
            Please sign-in to your account and start the adventure
          </p>

          <form className={styles.form__fields} onSubmit={handleSubmit}>
            {/* Поле Email */}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              error={hasError}
              inputProps={{ lang: 'en' }}
            />

            {/* Поле Password */}
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              error={hasError}
              helperText={error} // Сообщение об ошибке под вторым инпутом
              inputProps={{ lang: 'en' }}
            />

            {/* Чекбокс и ссылка "Forgot password" */}
            <div className={styles.form__options}>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Link
                href="/forgot-password"
                className={styles['form__options__forgot-password']}
              >
                Forgot password?
              </Link>
            </div>

            {/* Кнопка Вход */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className={styles.form__button}
            >
              Log In
            </Button>

            {/* Ссылка на регистрацию */}
            <p className={styles.form__register}>
              New on our platform?{' '}
              <Link
                href="/register"
                className={styles['form__register__register-link']}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
