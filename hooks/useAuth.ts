import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getToken, removeToken } from '@/utils/auth';
import { fetchCurrentUser } from '@/utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (err) {
        removeToken();
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  return user;
};
