import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';

('server only');

// TODO COVER ALL CONTROL PATHWAYS PROPERLY
export async function authOrSignInRedirect(
  redirectUrl?: string,
  whenAuthenticated?: boolean
) {
  const newVar = await auth();
  if (!newVar && !whenAuthenticated) {
    let url = '/sign-in';
    if (redirectUrl) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set('redirectUrl', redirectUrl);
      url = url + '?' + urlSearchParams.toString();
    }
    redirect(url);
  }
  if (newVar && whenAuthenticated) {
    if (redirectUrl) {
      redirect(redirectUrl);
    } else {
      redirect('/');
    }
  }
  return newVar as Session;
}
