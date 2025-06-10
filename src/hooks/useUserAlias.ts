// src/hooks/useUserAlias.ts
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthListener } from './useAuthListener';

export function useUserAlias() {
  const { user, loading: authLoading } = useAuthListener();
  const [alias, setAlias] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    const uid = user.uid;
    async function fetchAlias() {
      const ref = doc(db, 'users', uid);
      const snap = await getDoc(ref);
      const data = snap.data();
      setAlias(data?.alias ?? '');
      setLoading(false);
    }
    fetchAlias();
  }, [user, authLoading]);

  return { alias, loading };
}