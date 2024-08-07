'use client';
import { UnsavedChangesProps } from 'dto-stores/dist/types';
import { MasterChangesController } from 'dto-stores';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren, useCallback, useTransition } from 'react';
import { Badge } from '@nextui-org/badge';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Session } from 'next-auth';

export interface OtherUnsavedChangesProps extends PropsWithChildren {
  session?: Session | null;
}

function UnsavedChangesToast({
  session,
  ...props
}: UnsavedChangesProps & OtherUnsavedChangesProps) {
  return (
    <div className={'fixed right-4 top-4 z-30 h-fit w-fit'}>
      <Popover>
        <Badge
          content={'!'}
          color={'danger'}
          className={clsx(props.unsavedFlag ? '' : 'hidden')}
        >
          <PopoverTrigger>
            <Button
              isIconOnly={true}
              className={clsx('h-12 w-12 rounded-full p-1 ')}
              variant={'light'}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className={'rounded-full'}
                />
              ) : (
                <UserCircleIcon
                  className={clsx(session && 'text-emerald-500')}
                />
              )}
            </Button>
          </PopoverTrigger>
        </Badge>
        <PopoverContent>
          <UnsavedChangesContent {...props} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function UnsavedChangesContent({
  unsavedFlag,
  handleCommit,
  children
}: UnsavedChangesProps & PropsWithChildren) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {children}
      {unsavedFlag && (
        <Button
          className={'group relative w-fit hover:opacity-75'}
          onPress={() => startTransition(() => handleCommit())}
          variant={'light'}
          color={'success'}
        >
          <PendingOverlay pending={isPending} />
          <span className={'mr-2 w-fit text-nowrap text-black'}>
            Unsaved changes.
          </span>
          <ExclamationTriangleIcon
            className={'h-6 w-6 fill-red-500'}
          ></ExclamationTriangleIcon>
        </Button>
      )}
    </>
  );
}

export function MasterChangesTrackWrapper({
  children,
  session
}: OtherUnsavedChangesProps) {
  const WithChildren = useCallback(
    (props: UnsavedChangesProps) => (
      <UnsavedChangesToast {...props} session={session}>
        {children}
      </UnsavedChangesToast>
    ),
    [children, session]
  );

  return <MasterChangesController unsavedChangesToast={WithChildren} />;
}
