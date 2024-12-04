'use client';

import React, { useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import SidebarItem from './SidebarItem';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div
      className={`${styles.sidebar} ${
        isExpanded ? styles.expanded : styles.collapsed
      }`}
      onMouseEnter={() => !isExpanded && setIsExpanded(true)}
      onMouseLeave={() => !isExpanded && setIsExpanded(false)}
    >
      <div className={styles.logo}>
        <span>Materio</span>
        <input
          type="checkbox"
          checked={isExpanded}
          onChange={toggleExpand}
          className={styles.toggle}
        />
      </div>
      <ul className={styles.menu}>
        <SidebarItem icon={<AppsIcon />} label="Programs" link="/dashboard/programs" />
        <SidebarItem
          icon={<PeopleIcon />}
          label="Users"
          subItems={[
            { label: 'List', link: '/dashboard/users/list' },
            { label: 'View', link: '/dashboard/users/view' },
          ]}
        />
        <SidebarItem
          icon={<CalendarTodayIcon />}
          label="Calendar"
          link="/dashboard/calendar"
        />
        <SidebarItem
          icon={<DashboardIcon />}
          label="Kanban"
          link="/dashboard/kanban"
        />
      </ul>
      <div className={styles.footer}>
        <SidebarItem icon={<ExitToAppIcon />} label="Log out" link="/logout" />
      </div>
    </div>
  );
};

export default Sidebar;
