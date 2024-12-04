'use client';

import React from 'react';

import Sidebar from '@/components/Sidebar/Sidebar';

import styles from './layout.module.scss';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
