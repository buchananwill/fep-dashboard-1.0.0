import { auth, signIn, signOut } from '@/auth';
import { SignIn } from '@/components/auth/SignIn';

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user) return <SignIn></SignIn>;
  else
    return (
      <div>
        <form
          action={async (formData) => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className={'rounded-full'}
              />
            ) : (
              'Logged in'
            )}
          </button>
        </form>
      </div>
    );
}
