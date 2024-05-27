'use client';
import { BaseDtoUiProps, DtoUiWrapper } from 'dto-stores';
import {
  StringAttributeInputArray,
  StringPropertyNames
} from '@/components/generic/StringAttributeInputArray';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityClassMap } from '@/api/entity-class-map';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';

export default function KnowledgeDomainCard({ id }: { id: number }) {
  return (
    <DtoUiWrapper
      renderAs={InternalUiComponent}
      entityId={id}
      entityClass={EntityClassMap.knowledgeDomain}
    />
  );
}
const knowledgeDomainProps: StringPropertyNames<KnowledgeDomainDto>[] = [
  'name'
];

function InternalUiComponent({
  entity,
  dispatchWithoutControl
}: BaseDtoUiProps<KnowledgeDomainDto>) {
  const updateStringProps = (
    value: string,
    attributeKey: StringPropertyNames<KnowledgeDomainDto>
  ) => {
    if (dispatchWithoutControl === undefined) return;
    dispatchWithoutControl((entity) => ({ ...entity, [attributeKey]: value }));
  };

  return (
    <Card>
      <CardHeader>
        {entity.knowledgeDomainDescriptor} {entity.id}
      </CardHeader>
      <CardBody>
        <StringAttributeInputArray
          entity={entity}
          attributeKeys={knowledgeDomainProps}
          update={updateStringProps}
        />
      </CardBody>
    </Card>
  );
}
