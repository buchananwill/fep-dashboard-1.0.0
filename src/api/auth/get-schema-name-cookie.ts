import { SCHEMA_NAME_COOKIE } from '@/api/literals';

('server only');
import { cookies } from 'next/headers';

export const getSchemaNameCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_NAME_COOKIE);
};
