import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';
import { ChooseSchemaField } from '@/app/admin/create-schema/ChooseSchemaField';

export default async function Page() {
  await authOrSignInRedirect('/admin/create-schema');

  return (
    <form className={'rounded-lg bg-white p-4 shadow-2xl'}>
      <h1>Create schema</h1>
      <ChooseSchemaField />
    </form>
  );
}
