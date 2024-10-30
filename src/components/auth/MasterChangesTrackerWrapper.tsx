'use client';
import { UnsavedChangesProps } from 'dto-stores/dist/types';
import { MasterChangesController } from 'dto-stores';
import clsx from 'clsx';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren, useCallback, useMemo, useTransition } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Session } from 'next-auth';
import { Button, Popover, Image, Indicator } from '@mantine/core';

export interface OtherUnsavedChangesProps extends PropsWithChildren {
  session?: Record<string, any>;
}

function UnsavedChangesToast({
  session,
  ...props
}: UnsavedChangesProps & OtherUnsavedChangesProps) {
  const interceptedProps = useMemo(() => {
    const { handleCommit } = props;
    let interceptedCommit = handleCommit;
    if (!session || !session.email) {
      interceptedCommit = async () => {
        alert(
          'Only authenticated users may save edits. To revert changes and reload from the database, hit F5.'
        );
      };
    }
    return { ...props, handleCommit: interceptedCommit };
  }, [props, session]);

  return (
    <div
      className={
        'fixed right-4 top-4 z-30 h-fit w-fit opacity-50 transition-opacity hover:opacity-100'
      }
    >
      <Popover>
        <Indicator label={'!'} color={'red'} disabled={!props.unsavedFlag}>
          <Popover.Target>
            <Button
              variant={'light'}
              styles={{
                root: {
                  width: 'fit-content',
                  height: 'fit-content',
                  padding: 8,
                  borderRadius: '50%'
                }
              }}
            >
              {session?.image ? (
                <Image src={session.image} alt="User Avatar" radius={'xl'} />
              ) : (
                <UserCircleIcon
                  className={clsx(session && 'h-12 w-12 text-emerald-500')}
                />
              )}
            </Button>
          </Popover.Target>
        </Indicator>
        <Popover.Dropdown>
          <UnsavedChangesContent {...interceptedProps} />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

function UnsavedChangesContent({
  unsavedFlag,
  handleCommit,
  children
}: UnsavedChangesProps & OtherUnsavedChangesProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      {children}
      {unsavedFlag && (
        <Button
          className={'group relative w-fit hover:opacity-75'}
          onClick={() => startTransition(() => handleCommit())}
          variant={'subtle'}
          color={'success'}
        >
          <PendingOverlay pending={isPending} />
          <span className={'mr-2 w-fit text-nowrap text-black'}>
            Save changes?
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
