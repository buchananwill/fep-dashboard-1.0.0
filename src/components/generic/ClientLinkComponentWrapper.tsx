'use client';
import { DtoComponentArrayGenerator } from 'dto-stores';
import LinkToEntityPage from '@/components/generic/LinkToEntityPage';

export function ClientLinkComponentWrapper({
  entityName
}: {
  entityName: string;
}) {
  return (
    <DtoComponentArrayGenerator
      entityName={entityName}
      eachAs={LinkToEntityPage}
    />
  );
}
