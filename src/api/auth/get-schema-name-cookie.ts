'server only';

import { SCHEMA_NAME_COOKIE } from '@/api/literals';
import { cookies } from 'next/headers';

export const getSchemaNameCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(SCHEMA_NAME_COOKIE);
};
