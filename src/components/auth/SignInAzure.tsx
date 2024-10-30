import { signIn } from '@/auth';

export function SignInAzure({ redirectUrl }: { redirectUrl?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('microsoft-entra-id', { redirectTo: redirectUrl });
      }}
    >
      <button
        type="submit"
        className={
          'duration-250 transition-colors-opacity rounded-xl p-2 hover:bg-blue-100'
        }
      >
        Sign in with Microsoft
      </button>
    </form>
  );
}
