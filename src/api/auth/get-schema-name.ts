'server only';
import { cookies } from 'next/headers';

export const getSchemaName = () => cookies().get('schema_name');
