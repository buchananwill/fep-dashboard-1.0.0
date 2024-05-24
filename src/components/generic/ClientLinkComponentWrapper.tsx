'use client';

import ContextualLinkToEntityPage from '@/components/generic/ContextualLinkToEntityPage';
import { DtoComponentArray } from 'dto-stores';

export function ClientLinkComponentWrapper({
  entityClass
}: {
  entityClass: string;
}) {
  return (
    <DtoComponentArray
      entityClass={entityClass}
      eachAs={ContextualLinkToEntityPage}
    />
  );
}
