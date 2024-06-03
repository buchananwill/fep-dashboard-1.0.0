'use client';

import ContextualLinkToEntityPage from '@/components/generic/ContextualLinkToEntityPage';
import { DtoUiListAll } from 'dto-stores';

export function ClientLinkComponentWrapper({
  entityClass
}: {
  entityClass: string;
}) {
  return (
    <DtoUiListAll
      entityClass={entityClass}
      renderAs={ContextualLinkToEntityPage}
    />
  );
}
