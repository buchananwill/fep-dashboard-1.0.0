'use client';
import { DtoComponentWrapper, DtoUiComponentProps } from 'dto-stores';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import {
  StringAttributeInputArray,
  StringPropertyNames
} from '@/components/generic/StringAttributeInputArray';

const serviceCategoryProperties: StringPropertyNames<ServiceCategoryDto>[] = [
  'name',
  'knowledgeDomainDescriptor',
  'knowledgeLevelDescriptor'
];

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
        <StringAttributeInputArray
          entity={entity}
          attributeKeys={serviceCategoryProperties}
          update={update}
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
