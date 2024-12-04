'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  link?: string;
  subItems?: { label: string; link: string }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  link,
  subItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubItems = () => setIsOpen((prev) => !prev);

  return (
    <li className={`${styles.item} ${isOpen ? styles.active : ''}`}>
      {link ? (
        <Link href={link} className={styles.link}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </Link>
      ) : (
        <div onClick={toggleSubItems} className={styles.expandable}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
          <span className={styles.arrow}>
            {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </span>
        </div>
      )}
      {subItems && isOpen && (
        <ul className={styles.subMenu}>
          {subItems.map((subItem) => (
            <li key={subItem.label}>
              <Link href={subItem.link} className={styles.subLink}>
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
