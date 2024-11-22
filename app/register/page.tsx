'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import { registerUser } from '@/utils/api';

import styles from './register.module.scss';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      // Валидация паролей
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    setError('');
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setError('');
    try {
      // Отправка данных в API
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      alert('Registration successful!');
      router.push('/login'); // Редирект на страницу логина
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Левая часть */}
      <div className={styles.container__left}>
        <Image
          src="/images/illustrations/characters/girl2.png"
          alt="Girl Illustration"
          width={360}
          height={400}
          className={styles.container__img}
          priority
        />
      </div>

      {/* Правая часть */}
      <div className={styles.container__right}>
        <div className={styles.form}>
          {/* Прогресс этапов */}
          <div className={styles.steps}>
            <div className={styles.steps__wrapper}>
              <div
                className={`${styles.step} ${currentStep >= 1 && styles.completed}`}
              >
                <div className={styles.step__circle}>
                  {currentStep > 1 ? <i className="ri-check-line"></i> : '01'}
                </div>
                <div className={styles.step__text}>
                  <span>Account</span>
                  <p>Account Details</p>
                </div>
              </div>
              <div
                className={`${styles.step__line} ${currentStep > 1 ? styles.activeLine : ''}`}
              ></div>
              <div
                className={`${styles.step} ${currentStep === 2 && styles.active}`}
              >
                <div className={styles.step__circle}>02</div>
                <div className={styles.step__text}>
                  <span>Personal</span>
                  <p>Enter Information</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ошибка */}
          {error && <p className={styles.form__error}>{error}</p>}

          {/* Формы */}
          {currentStep === 1 && (
            <form className={styles.form__fields}>
              <Input
                label="Username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
              />
              <div className={styles.actions}>
                <Button
                  variant="outlined"
                  disabled
                  startIcon={<i className="ri-arrow-left-line"></i>}
                  className={styles.previousButton}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<i className="ri-arrow-right-line"></i>}
                  onClick={goToNextStep}
                  className={styles.nextButton}
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form className={styles.form__fields}>
              <Input
                label="First Name"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <Input
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
              <Input
                label="Mobile"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
                }
              />
              <Input
                label="Address"
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
              <div className={styles.actions}>
                <Button
                  variant="contained"
                  startIcon={<i className="ri-arrow-left-line"></i>}
                  onClick={goToPreviousStep}
                  className={styles.previousButton}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<i className="ri-check-line"></i>}
                  className={styles.submitButton}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
