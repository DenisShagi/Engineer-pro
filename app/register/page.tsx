'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';

import Input from '@/components/Input';

import styles from './register.module.scss';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

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
              {/* Первый этап */}
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
              {/* Линия */}
              <div
                className={`${styles.step__line} ${
                  currentStep > 1 ? styles.activeLine : ''
                }`}
              ></div>
              {/* Второй этап */}
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

          {/* Формы */}
          {currentStep === 1 && (
            <form className={styles.form__fields}>
              <div className={styles.form__container}>
                <h2 className={styles.form__container__title}>
                  Account Information
                </h2>
                <p>Enter Your Account Details</p>
              </div>
              <Input label="Username" type="text" required />
              <Input label="Email" type="email" required />
              <Input label="Password" type="password" required />
              <Input label="Confirm Password" type="password" required />
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
              <div className={styles.form__container}>
                <h2 className={styles.form__container__title}>
                  Personal Information
                </h2>
                <p className={styles.form__container__description}>
                  Enter Your Personal Information
                </p>
              </div>
              <Input label="First Name" type="text" required />
              <Input label="Last Name" type="text" required />
              <Input
                label="Mobile"
                type="tel"
                mask={[
                  '+',
                  '7',
                  ' ',
                  '(',
                  /\d/,
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
                ]}
                required
              />
              <Input label="Address" type="text" required />
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
