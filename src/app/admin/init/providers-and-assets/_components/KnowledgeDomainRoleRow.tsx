'use client';
import { BaseLazyDtoUiProps } from 'dto-stores';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';

export default function KnowledgeDomainRoleRow({
  entity,
  ...otherProps
}: BaseLazyDtoUiProps<KnowledgeDomainRoleRowInterface>) {
  return (
    <tr>
      <td>{entity.knowledgeDomain.name}</td>
      <td>
        <DtoStoreNumberInput
          entity={entity}
          min={0}
          numberKey={'providerRoleCount'}
          {...otherProps}
        />
      </td>
      <td>
        <DtoStoreNumberInput
          entity={entity}
          min={0}
          numberKey={'assetRoleCount'}
          {...otherProps}
        ></DtoStoreNumberInput>
      </td>
    </tr>
  );
}

export interface KnowledgeDomainRoleRowInterface {
  id: number;
  knowledgeDomain: KnowledgeDomainDto;
  providerRoleCount: number;
  assetRoleCount: number;
}

export const knowledgeDomainRoleRow = 'KnowledgeDomainRoleRow';
