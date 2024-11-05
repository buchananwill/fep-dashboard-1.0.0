import { auth, signOut } from '@/auth';
import { SignInGoogle } from '@/components/auth/SignInGoogle';
import { SignInAzure } from '@/components/auth/SignInAzure';
import { Image } from '@mantine/core';
import { cookies } from 'next/headers';
import { SCHEMA_NAME_COOKIE } from '@/api/literals';
import { redirect } from 'next/navigation';
import { ResetButton } from '@/components/auth/ResetButton';

export default async function UserAvatar({}: {}) {
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
      <div className={'flex w-full flex-col justify-center gap-2'}>
        <form
          action={async () => {
            'use server';
            const cookieStore = await cookies();
            await cookieStore.delete(SCHEMA_NAME_COOKIE);
            await signOut();
            redirect('/');
          }}
          className={'flex w-full flex-col justify-center gap-2'}
        >
          <button
            type="submit"
            className={
              'transition-colors-opacity flex items-center justify-center gap-2 rounded-lg p-1 hover:bg-rose-100'
            }
          >
            Sign out:
            {session.user.image ? (
              <Image
                src={session.user.image}
                radius={'xl'}
                alt="User Avatar"
                className={'h-6 w-6 rounded-full'}
              />
            ) : (
              <div className={'flex flex-col rounded-full'}>
                <div>{`${session.user.name}`}</div>
                {session.user.email && <div>{session.user.email}</div>}
              </div>
            )}
          </button>
        </form>
        <ResetButton />
      </div>
    );
}
