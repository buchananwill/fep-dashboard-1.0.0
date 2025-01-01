import { refreshSchemaTokens } from '@/api/actions-custom/schemas/refresh-schema-tokens';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('handler refresh route');
  await refreshSchemaTokens();
  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get('redirect') ?? '';
  redirect(`/${decodeURIComponent(redirectUrl)}`);
}
