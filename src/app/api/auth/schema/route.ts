import { getTenancy } from '@/api/auth/get-tenancy';
import { setSchemaNameCookie } from '@/api/actions-custom/schemas/set-schema-name-cookie';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function GET() {
  const session = await auth();

  const email = session?.user?.email;

  if (email) {
    const tenancyDtoPartial = await getTenancy(email);
    console.log({ tenancyDtoPartial });
    if (tenancyDtoPartial.schemaName) {
      await setSchemaNameCookie(tenancyDtoPartial);
      redirect('/core');
    }
  }

  redirect('/');
}
