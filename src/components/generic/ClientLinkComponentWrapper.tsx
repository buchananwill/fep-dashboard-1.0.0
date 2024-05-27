'use client';

import ContextualLinkToEntityPage from '@/components/generic/ContextualLinkToEntityPage';
import { DtoUiArray } from 'dto-stores';

export function ClientLinkComponentWrapper({
  entityClass
}: {
  entityClass: string;
}) {
  return (
    <DtoUiArray
      entityClass={entityClass}
      renderAs={ContextualLinkToEntityPage}
    />
  );
}
