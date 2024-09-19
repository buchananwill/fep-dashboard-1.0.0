'use client';
import { RoleEntity } from '@/components/roles/types';
import CreatePersonForm from '@/components/roles/CreatePersonForm';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import pluralize from 'pluralize';

export function getCreationContextKey(
  roleEntityType: 'provider' | 'asset' | 'user'
) {
  return `create${roleEntityType}`;
}

export default function RoleBaseDetails({
  roleEntityType
}: {
  roleEntityType: RoleEntity;
}) {
  const { currentState } = useGlobalListener({
    contextKey: getCreationContextKey(roleEntityType),
    initialValue: undefinedSubmission,
    listenerKey: 'role-base-details'
  });

  switch (roleEntityType) {
    case 'provider': {
      return (
        <CreatePersonForm
          redirectUrl={`/core/${pluralize(roleEntityType)}`}
          createPersonAction={async (person) =>
            currentState.memoizedFunction(person)
          }
        />
      );
    }
  }
}

const undefinedSubmission = {
  memoizedFunction: (...input: any) => console.error('No action defined.')
};
