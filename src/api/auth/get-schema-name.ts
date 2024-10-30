'server only';
import { cookies } from 'next/headers';

export const getSchemaName = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('schema_name');
};
