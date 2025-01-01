import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.set('test-cookie', JSON.stringify({ message: 'a test cookie' }));
  redirect('/');
}
