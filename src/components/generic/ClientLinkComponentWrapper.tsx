'use client';
import { DtoComponentArrayGenerator } from 'dto-stores';
import ContextualLinkToEntityPage from '@/components/generic/ContextualLinkToEntityPage';

export function ClientLinkComponentWrapper({
  entityName
}: {
  entityName: string;
}) {
  return (
    <DtoComponentArrayGenerator
      entityName={entityName}
      eachAs={ContextualLinkToEntityPage}
    />
  );
}
