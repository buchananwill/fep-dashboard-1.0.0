'use client';

import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';

import { EntityClassMap } from '@/api/entity-class-map';
import { StringAttributeInputArray } from '@/components/generic/StringAttributeInputArray';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { useCallback } from 'react';
import { BaseDtoUiProps, DtoUiWrapper } from 'dto-stores';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { StringPropertyKey } from '@/types';

const serviceCategoryProperties: StringPropertyKey<ServiceCategoryDto>[] = [
  'knowledgeDomainDescriptor',
  'knowledgeLevelDescriptor'
];

function InternalUiComponent(props: BaseDtoUiProps<ServiceCategoryDto>) {
  const { entity, dispatchWithoutControl, deleted, ...otherProps } = props;
  const update = useCallback(
    (value: string, attributeKey: StringPropertyKey<ServiceCategoryDto>) => {
      if (dispatchWithoutControl === undefined) return;
      dispatchWithoutControl((entity) => ({
        ...entity,
        [attributeKey]: value
      }));
    },
    [dispatchWithoutControl]
  );

  if (!entity) return null;

  return (
    <Card className={'relative'}>
      <DeletedOverlay
        show={deleted}
        handleUnDelete={() => {
          if (!props.dispatchDeletion) return;
          props.dispatchDeletion((list) =>
            list.filter((deletedId) => deletedId !== entity.id)
          );
        }}
      />
      <CardHeader>
        <EditTextDeleteEntityPopover<ServiceCategoryDto>
          {...props}
          stringKey={'name'}
        />
      </CardHeader>
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
    <DtoUiWrapper
      renderAs={InternalUiComponent}
      entityClass={EntityClassMap.serviceCategory}
      entityId={id}
    />
  );
}
