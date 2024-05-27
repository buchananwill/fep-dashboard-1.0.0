'use client';

import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';

import { EntityClassMap } from '@/api/entity-class-map';
import {
  StringAttributeInputArray,
  StringPropertyNames
} from '@/components/generic/StringAttributeInputArray';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { useCallback } from 'react';
import { BaseDtoUiProps, DtoUiProps, useDtoComponent } from 'dto-stores';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

const serviceCategoryProperties: StringPropertyNames<ServiceCategoryDto>[] = [
  'knowledgeDomainDescriptor',
  'knowledgeLevelDescriptor'
];

function InternalUiComponent(props: BaseDtoUiProps<ServiceCategoryDto>) {
  const { entity, dispatchWithoutControl, deleted, ...otherProps } = props;
  const update = useCallback(
    (value: string, attributeKey: StringPropertyNames<ServiceCategoryDto>) => {
      if (dispatchWithoutControl === undefined) return;
      dispatchWithoutControl((entity) => ({
        ...entity,
        [attributeKey]: value
      }));
    },
    [dispatchWithoutControl]
  );

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
          listenerKey={'card'}
          textAccessor={(ent) => ent.name}
          textSetter={(ent, value) => ({ ...ent, name: value })}
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
  const DtoComponent = useDtoComponent<ServiceCategoryDto, any>(
    EntityClassMap.serviceCategory,
    InternalUiComponent
  );

  return <DtoComponent entityId={id} />;
}
