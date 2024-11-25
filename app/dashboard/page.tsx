// app/dashboard/page.tsx

'use client';

import React, { useState } from 'react';

import Sidebar from '@/components/Sidebar';

import styles from './dashboard.module.scss';

// import { useRouter } from 'next/navigation';

// import { fetchCurrentUser } from '@/utils/api';
// import { getToken, removeToken } from '@/utils/auth';
const Dashboard: React.FC = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar isExpanded={isSidebarExpanded} toggleExpand={toggleSidebar} />
      <div
        className={`${styles.content} ${
          isSidebarExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard! Use the menu to navigate.</p>
      </div>
    </div>
  );
};

export default Dashboard;

// export default function DashboardPage() {
// const [user, setUser] = useState<any>(null);
// const [error, setError] = useState('');
// const router = useRouter();

// useEffect(() => {
//   const token = getToken();

//   if (!token) {
//     router.push('/login');
//     return;
//   }

//   const fetchUser = async () => {
//     try {
//       const userData = await fetchCurrentUser(token);
//       setUser(userData);
//     } catch (err: any) {
//       setError(err.message);
//       removeToken();
//       router.push('/login');
//     }
//   };

//   fetchUser();
// }, [router]);

// if (error) {
//   return <p>{error}</p>;
// }

// if (!user) {
//   return <p>Loading...</p>;
// }

// return (
// <div>
{
  /* <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p> */
}
{
  /* Добавим кнопку выхода */
}
{
  /* <button
        onClick={() => {
          removeToken();
          router.push('/login');
        }}
      >
        Log Out
      </button> */
}
{
  /* </div> */
}
// );
// }
