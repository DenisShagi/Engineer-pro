'use client';

import React from 'react';



import styles from './dashboard.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
    
      <div className={styles.content}>
        <h1>Welcome to the tecnolog</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}
