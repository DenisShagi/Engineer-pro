'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

import Input from '@/components/Input'; // Универсальный инпут

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

          <form className={styles.form__fields}>
            {/* Поле Email */}
            <Input label="Email" type="email" required />

            {/* Поле Password */}
            <Input label="Password" type="password" required />

            {/* Чекбокс и ссылка "Forgot password" */}
            <div className={styles.form__options}>
              <FormControlLabel
                control={<CustomCheckbox />}
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
