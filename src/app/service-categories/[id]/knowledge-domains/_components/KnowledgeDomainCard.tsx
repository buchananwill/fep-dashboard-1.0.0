'use client';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { StringAttributeInputArray } from '@/components/generic/StringAttributeInputArray';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityClassMap } from '@/api/entity-class-map';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { StringPropertyKey } from '@/types';

export default function KnowledgeDomainCard({ id }: { id: number }) {
  return (
    <LazyDtoUiWrapper
      renderAs={InternalUiComponent}
      entityId={id}
      entityClass={EntityClassMap.knowledgeDomain}
      whileLoading={() => null}
    />
  );
}
const knowledgeDomainProps: StringPropertyKey<KnowledgeDomainDto>[] = ['name'];

function InternalUiComponent({
  entity,
  dispatchWithoutControl
}: BaseLazyDtoUiProps<KnowledgeDomainDto>) {
  const updateStringProps = (
    value: string,
    attributeKey: StringPropertyKey<KnowledgeDomainDto>
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
