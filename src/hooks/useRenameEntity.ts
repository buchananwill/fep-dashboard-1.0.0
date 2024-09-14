import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import { HasId } from '@/api/types';
import React from 'react';
import { useModalEditEntityTextAttribute } from '@/hooks/useModalEditEntityTextAttribute';
import { StringPropertyKey } from '@/types';

export function useRenameEntity<T extends HasNameDto & HasId>(
  entityClass: string,
  entity: T,
  dispatchWithoutControl?: React.Dispatch<React.SetStateAction<T>>
) {
  return useModalEditEntityTextAttribute(
    entityClass,
    entity,
    'name' as StringPropertyKey<T>,
    dispatchWithoutControl
  );
}
