'use client';

import React from 'react';
import Link from 'next/link';

import styles from './page.module.scss';

const ProgramsPage = () => {
  const programs = [
    { id: '1', name: 'Program A' },
    { id: '2', name: 'Program B' },
    { id: '3', name: 'Program C' },
  ];

  return (
    <div className={styles.programs}>
      <h1>Programs</h1>
      <ul className={styles.programList}>
        {programs.map((program) => (
          <li key={program.id}>
            <Link href={`/dashboard/programs/${program.id}`}>
              {program.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramsPage;
