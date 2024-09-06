import { auth, signOut } from '@/auth';
import { SignInGoogle } from '@/components/auth/SignInGoogle';
import { SignInAzure } from '@/components/auth/SignInAzure';

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <>
        <SignInGoogle />
        <SignInAzure />
      </>
    );
  } else
    return (
      <div>
        <form
          action={async (formdata) => {
            'use server';
            await signOut();
          }}
        >
          <button
            type="submit"
            className={
              'flex flex-col items-center rounded-lg p-1 transition-colors-opacity hover:bg-rose-100'
            }
          >
            Sign out:
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className={'h-12 w-12 rounded-full'}
              />
            ) : (
              session.user.name
            )}
          </button>
        </form>
      </div>
    );
}
