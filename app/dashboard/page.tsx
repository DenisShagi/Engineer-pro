'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser } from '@/utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </div>
  );
}
