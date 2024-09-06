import { signIn } from '@/auth';

export function SignInGoogle() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/core/navigation' });
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
