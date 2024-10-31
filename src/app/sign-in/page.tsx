import { SignInGoogle } from '@/components/auth/SignInGoogle';
import { SignInAzure } from '@/components/auth/SignInAzure';
import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';

export default async function page({
  searchParams: { redirectUrl }
}: {
  searchParams: { redirectUrl: string };
}) {
  const session = await authOrSignInRedirect('/core', true);

  return (
    <>
      <>
        <SignInGoogle />
        <SignInAzure redirectUrl={redirectUrl} />
      </>
    </>
  );
}
