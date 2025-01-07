import { useEffect, useState } from 'react';
import { EmptyArray } from '@/api/client-literals';

export function useSimpleApiFetcher<T>(serverAction: () => Promise<T[]>) {
  const [entities, setEntities] = useState<T[]>(EmptyArray);

  useEffect(() => {
    const fetchEntities = async () => {
      const kdList = await serverAction();
      setEntities(kdList);
    };
    fetchEntities();
  }, [serverAction]);
  return entities;
}
