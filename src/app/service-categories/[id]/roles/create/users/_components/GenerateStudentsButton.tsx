'use client';
import { Button } from '@nextui-org/button';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { useCallback, useTransition } from 'react';
import { UserRowState } from '@/app/service-categories/[id]/roles/create/users/_components/UserNumberInputRow';
import { isNotUndefined } from '@/api/main';
import { initStudents } from '@/utils/init-database-functions/resources/initStudentsAction';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

export const UserRowStateClass = 'UserRowState';
export default function GenerateStudentsButton() {
  const listenerKey = useUuidListenerKey();
  const { currentState: rowIdList } = NamespacedHooks.useListen<number[]>(
    UserRowStateClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );
  const readAnyRow = useReadAnyDto<UserRowState>(UserRowStateClass);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = useCallback(() => {
    startTransition(async () => {
      const promises = rowIdList
        .map(readAnyRow)
        .filter(isNotUndefined)
        .map(({ levelOrdinal, knowledgeLevelSeriesId, howMany }) => ({
          levelOrdinal,
          howMany,
          serviceCategoryId: knowledgeLevelSeriesId
        }))
        .map((params) => initStudents(params));
      const array = await Promise.all(promises);
    });
  }, [rowIdList, readAnyRow]);

  return (
    <Button
      className={
        'group relative m-2 h-fit w-fit min-w-fit overflow-visible rounded-lg bg-sky-800 p-0'
      }
      disableRipple={true}
      disableAnimation={true}
      onPress={handleGenerate}
    >
      <PendingOverlay pending={isPending} />
      <span
        className={
          'peer z-10 inline-block -translate-y-1 select-none rounded-lg bg-gradient-to-br from-sky-50 to-blue-200 p-4 transition-transform duration-250 ease-out hover:-translate-y-2  active:-translate-y-0.5'
        }
      >
        Generate
      </span>
      <span
        className={
          'absolute z-0 block h-full w-full scale-125  rounded-lg border-4 border-emerald-600 opacity-0 transition-opacity duration-500 peer-hover:animate-pulse'
        }
      />
    </Button>
  );
}
