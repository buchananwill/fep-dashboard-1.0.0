import { signIn } from '@/auth';

export function SignInAzure() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('microsoft-entra-id');
      }}
    >
      <button
        type="submit"
        className={
          'rounded-xl p-2 duration-250 transition-colors-opacity hover:bg-blue-100'
        }
      >
        Sign in with Microsoft
      </button>
    </form>
  );
}
