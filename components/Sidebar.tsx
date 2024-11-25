'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Checkbox, FormControlLabel } from '@mui/material';
import {
  MailOutline as MailIcon,
  ChatBubbleOutline as ChatIcon,
  CalendarTodayOutlined as CalendarIcon,
  ViewList as KanbanIcon,
  PersonOutline as UserIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC<{ isExpanded: boolean; toggleExpand: () => void }> = ({
  isExpanded,
  toggleExpand,
}) => {
  const [isLocked, setIsLocked] = useState(false); // Чекбокс для блокировки
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onMouseEnter={!isLocked ? toggleExpand : undefined}
      onMouseLeave={!isLocked ? toggleExpand : undefined}
    >
      <div className={styles.logo}>
        <span>M</span>
        {isExpanded && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                color="primary"
              />
            }
            label="Lock"
          />
        )}
      </div>
      <nav className={styles.nav}>
        <div onClick={() => handleNavigation('/email')}>
          <MailIcon />
          {isExpanded && <span>Email</span>}
        </div>
        <div onClick={() => handleNavigation('/chat')}>
          <ChatIcon />
          {isExpanded && <span>Chat</span>}
        </div>
        <div onClick={() => handleNavigation('/calendar')}>
          <CalendarIcon />
          {isExpanded && <span>Calendar</span>}
        </div>
        <div onClick={() => handleNavigation('/kanban')}>
          <KanbanIcon />
          {isExpanded && <span>Kanban</span>}
        </div>
        <div className={styles.dropdown}>
          <div>
            <UserIcon />
            {isExpanded && (
              <>
                <span>User</span>
                <ExpandIcon />
              </>
            )}
          </div>
          {isExpanded && (
            <div className={styles.submenu}>
              <div onClick={() => handleNavigation('/user/view')}>View</div>
              <div onClick={() => handleNavigation('/user/list')}>List</div>
            </div>
          )}
        </div>
        <div onClick={() => handleNavigation('/programms')}>
          <KanbanIcon />
          {isExpanded && <span>Programms</span>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
