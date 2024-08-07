import { auth, signOut } from '@/auth';
import { SignIn } from '@/components/auth/SignIn';

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
          <button
            type="submit"
            className={
              'flex flex-col items-center rounded-lg p-1 transition-colors-opacity hover:bg-rose-100'
            }
          >
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
