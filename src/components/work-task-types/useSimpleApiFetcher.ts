import { useEffect, useState } from 'react';
import { EmptyArray } from '@/api/literals';

export function useSimpleApiFetcher<T>(serverAction: () => Promise<T[]>) {
  const [entities, setEntities] = useState<T[]>(EmptyArray);

  useEffect(() => {
    const fetchEntities = async () => {
      const kdList = await serverAction();
      setEntities(kdList);
      console.log(kdList);
    };
    fetchEntities();
  }, [serverAction]);
  return entities;
}
