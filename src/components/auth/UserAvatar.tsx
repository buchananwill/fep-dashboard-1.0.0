import { auth, signOut } from '@/auth';
import { SignInGoogle } from '@/components/auth/SignInGoogle';
import { SignInAzure } from '@/components/auth/SignInAzure';
import { Image } from '@nextui-org/image';

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
          action={async () => {
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
              <Image
                src={session.user.image}
                alt="User Avatar"
                className={'h-12 w-12 rounded-full'}
              />
            ) : (
              <div className={'flex flex-col'}>
                <div>{`${session.user.name}`}</div>
                {session.user.email && <div>{session.user.email}</div>}
              </div>
            )}
          </button>
        </form>
      </div>
    );
}
