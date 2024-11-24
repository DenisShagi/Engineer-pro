'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';

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
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(field, value);
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };
  const russianPhoneNumberMask = [
    '+',
    '7',
    ' ',
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];
  // Валидация поля
  const sanitizeInput = (field: string, value: string): string => {
    if (['username'].includes(field)) {
      // Разрешаем только английские буквы, цифры и подчеркивания
      return value.replace(/[^A-Za-z0-9_]/g, '');
    } else if (['email', 'password'].includes(field)) {
      // Удаляем русские буквы
      return value.replace(/[А-Яа-яЁё]/g, '');
    }
    return value;
  };

  const validateField = async (fieldName: string, value: string) => {
    let error = '';

    if (fieldName === 'username') {
      if (!value) {
        error = 'Username is required';
      } else {
        try {
          const response = await fetch(
            `/api/auth/check-username?username=${value}`,
          );
          const data = await response.json();
          if (data.exists) {
            error = 'Username already exists';
          }
        } catch (err) {
          error = 'Error checking username';
        }
      }
    } else if (fieldName === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address';
      } else {
        try {
          const response = await fetch(`/api/auth/check-email?email=${value}`);
          const data = await response.json();
          if (data.exists) {
            error = 'Email already exists';
          }
        } catch (err) {
          error = 'Error checking email';
        }
      }
    } else if (fieldName === 'phoneNumber') {
      if (!value) {
        error = 'Phone number is required';
      } else {
        try {
          const response = await fetch(
            `/api/auth/check-phone-number?phoneNumber=${value}`,
          );
          const data = await response.json();
          if (data.exists) {
            error = 'Phone number already exists';
          }
        } catch (err) {
          error = 'Error checking phone number';
        }
      }
    } else if (fieldName === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 8) {
        error = 'Password must be at least 8 characters';
      } else if (!/\d/.test(value)) {
        error = 'Password must contain at least one digit';
      } else if (/[А-Яа-яЁё]/.test(value)) {
        error = 'Password can contain only English letters';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  // useEffect для username
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formData.username) {
      timer = setTimeout(() => {
        validateField('username', formData.username);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formData.username]);

  // useEffect для email
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formData.email) {
      timer = setTimeout(() => {
        validateField('email', formData.email);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formData.email]);

  // useEffect для phoneNumber
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formData.phoneNumber) {
      timer = setTimeout(() => {
        validateField('phoneNumber', formData.phoneNumber);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formData.phoneNumber]);

  // useEffect для password и confirmPassword
  useEffect(() => {
    if (formData.password) {
      validateField('password', formData.password);
    }
  }, [formData.password]);

  useEffect(() => {
    if (formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  }, [formData.confirmPassword, formData.password]);

  const goToNextStep = () => {
    if (currentStep === 1) {
      const requiredFields = [
        'username',
        'email',
        'password',
        'confirmPassword',
      ];
      let hasError = false;

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: 'This field is required',
          }));
          hasError = true;
        }
      });

      if (Object.values(errors).some((error) => error)) {
        hasError = true;
      }

      if (hasError) {
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'address'];
    let hasError = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: 'This field is required',
        }));
        hasError = true;
      }
    });

    if (Object.values(errors).some((error) => error)) {
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      // Удаляем все нецифровые символы из номера телефона
      const rawPhoneNumber = formData.phoneNumber.replace(/\D/g, '');

      // Подготавливаем данные для отправки
      const submitData = {
        ...formData,
        phoneNumber: rawPhoneNumber,
      };
      // Отправка данных в API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        router.push('/login');
      } else {
        alert(data.error || 'An error occurred during registration.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred during registration.');
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
                className={`${styles.step} ${
                  currentStep >= 1 && styles.completed
                }`}
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
                className={`${styles.step__line} ${
                  currentStep > 1 ? styles.activeLine : ''
                }`}
              ></div>
              <div
                className={`${styles.step} ${
                  currentStep === 2 && styles.active
                }`}
              >
                <div className={styles.step__circle}>02</div>
                <div className={styles.step__text}>
                  <span>Personal</span>
                  <p>Enter Information</p>
                </div>
              </div>
            </div>
          </div>

          {/* Формы */}
          {currentStep === 1 && (
            <form className={styles.form__fields}>
              <Input
                label="Username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                onBlur={() => validateField('username', formData.username)}
                error={!!errors.username}
                helperText={errors.username}
                inputProps={{ lang: 'en' }}
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => validateField('email', formData.email)}
                error={!!errors.email}
                helperText={errors.email}
                inputProps={{ lang: 'en' }}
              />
              <Input
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => validateField('password', formData.password)}
                error={!!errors.password}
                helperText={errors.password}
                inputProps={{ lang: 'en' }}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                onBlur={() =>
                  validateField('confirmPassword', formData.confirmPassword)
                }
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                inputProps={{ lang: 'en' }}
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
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <Input
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <Input
                label="Mobile"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
                }
                onBlur={() =>
                  validateField('phoneNumber', formData.phoneNumber)
                }
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                mask={russianPhoneNumberMask}
              />
              <Input
                label="Address"
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
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
