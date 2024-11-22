'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import Input from '@/components/Input'; // Универсальный инпут
import { loginUser } from '@/utils/api'; // Функция для API-запроса

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { token } = await loginUser({ email, password });

      // Сохраняем токен
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      // Редирект на Dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
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

          {/* Вывод ошибок */}
          {error && <p className={styles.form__error}>{error}</p>}

          <form className={styles.form__fields} onSubmit={handleSubmit}>
            {/* Поле Email */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Поле Password */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
