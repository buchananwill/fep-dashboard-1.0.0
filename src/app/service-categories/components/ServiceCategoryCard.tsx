'use client';
import { DtoUiComponentProps, DtoComponentWrapper } from 'dto-stores';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { Input } from '@nextui-org/input';

// Utility type to filter keys pointing to string values
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function InternalUiComponent({
  entity,
  dispatchWithoutControl
}: DtoUiComponentProps<ServiceCategoryDto>) {
  const update = (
    value: string,
    attributeKey: StringPropertyNames<ServiceCategoryDto>
  ) => {
    if (dispatchWithoutControl === undefined) return;
    dispatchWithoutControl((entity) => ({ ...entity, [attributeKey]: value }));
  };

  return (
    <Card>
      <CardHeader>Service Category {entity.id}</CardHeader>
      <CardBody>
        <Input
          type={'text'}
          label={'Name'}
          value={entity.name}
          onValueChange={(value) => update(value, 'name')}
        />
        <Input
          type={'text'}
          label={'Knowledge Domain Descriptor'}
          value={entity.knowledgeDomainDescriptor}
          onValueChange={(value) => update(value, 'knowledgeDomainDescriptor')}
        />
        <Input
          type={'text'}
          label={'Knowledge Level Descriptor'}
          value={entity.knowledgeLevelDescriptor}
          onValueChange={(value) => update(value, 'knowledgeLevelDescriptor')}
        />
      </CardBody>
    </Card>
  );
}

export default function ServiceCategoryCard({ id }: { id: number }) {
  return (
    <DtoComponentWrapper
      uiComponent={InternalUiComponent}
      id={id}
      entityClass={EntityNamesMap.serviceCategory}
    />
  );
}
