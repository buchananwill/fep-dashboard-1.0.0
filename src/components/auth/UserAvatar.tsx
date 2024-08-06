import { auth, signIn, signOut } from '@/auth';
import { SignIn } from '@/components/auth/SignIn';
import { handleSignout } from '@/components/auth/handleSignout';

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user) return <SignIn />;
  else
    return (
      <div>
        <form
          action={async (formdata) => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit" className={'flex flex-col items-center'}>
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className={'h-12 w-12 rounded-full'}
              />
            ) : (
              'Sign Out'
            )}
            Sign out
          </button>
        </form>
      </div>
    );
}
