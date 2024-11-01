import { SignInGoogle } from '@/components/auth/SignInGoogle';
import { SignInAzure } from '@/components/auth/SignInAzure';
import { authOrSignInRedirect } from '@/api/auth/auth-or-sign-in-redirect';

export default async function page(props: {
  searchParams: Promise<{ redirectUrl: string }>;
}) {
  const searchParams = await props.searchParams;

  const { redirectUrl } = searchParams;

  await authOrSignInRedirect('/core', true);

  return (
    <>
      <>
        <SignInGoogle />
        <SignInAzure redirectUrl={redirectUrl} />
      </>
    </>
  );
}
