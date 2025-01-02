import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { ChooseSchemaField } from '@/app/admin/create-schema/ChooseSchemaField';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await authOrSignInRedirect('/admin/create-schema');

  const schemaNameCookie = await getSchemaNameCookie();

  if (schemaNameCookie) {
    redirect('/');
  }

  return (
    <form className={'rounded-lg bg-white p-4 shadow-2xl'}>
      <h1>Create schema</h1>
      <ChooseSchemaField />
    </form>
  );
}
