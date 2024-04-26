'use client';
import { DtoComponentWrapper, DtoUiComponentProps } from 'dto-stores';
import {
  StringAttributeInputArray,
  StringPropertyNames
} from '@/components/generic/StringAttributeInputArray';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { KnowledgeDomainDto } from '@/app/api/dtos/KnowledgeDomainDtoSchema';

export default function KnowledgeDomainCard({ id }: { id: number }) {
  return (
    <DtoComponentWrapper
      uiComponent={InternalUiComponent}
      id={id}
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
}: DtoUiComponentProps<KnowledgeDomainDto>) {
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
