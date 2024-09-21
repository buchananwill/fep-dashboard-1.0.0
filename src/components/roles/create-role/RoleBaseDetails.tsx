'use client';
import { RoleEntity } from '@/components/roles/types';
import CreatePersonForm from '@/components/roles/CreatePersonForm';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import pluralize from 'pluralize';
import { useMemo } from 'react';
import SelectTypeNames from '@/components/roles/create-role/SelectTypeNames';
import { Card } from '@nextui-org/card';

export function getCreationContextKey(roleEntityType: RoleEntity) {
  return `create${roleEntityType}`;
}

export default function RoleBaseDetails({
  roleEntity
}: {
  roleEntity: RoleEntity;
}) {
  const { currentState } = useGlobalListener({
    contextKey: getCreationContextKey(roleEntity),
    initialValue: undefinedSubmission,
    listenerKey: 'role-base-details'
  });

  const baseEntity = useMemo(() => {
    switch (roleEntity) {
      case 'provider': {
        return (
          <CreatePersonForm
            redirectUrl={`/core/${pluralize(roleEntity)}`}
            createPersonAction={async (person) =>
              currentState.memoizedFunction(person)
            }
          />
        );
      }
    }
  }, [roleEntity, currentState]);

  return (
    <div className={'flex flex-col gap-4'}>
      {baseEntity}
      <SelectTypeNames roleEntity={roleEntity} />
    </div>
  );
}

const undefinedSubmission = {
  memoizedFunction: (...input: any) => console.error('No action defined.')
};
