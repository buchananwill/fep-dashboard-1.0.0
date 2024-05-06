'use client';
import { DtoComponentWrapper, DtoUiComponentProps } from 'dto-stores';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  StringAttributeInputArray,
  StringPropertyNames
} from '@/components/generic/StringAttributeInputArray';
import { Button } from '@nextui-org/button';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { useDtoStoreDelete } from 'dto-stores/dist/hooks/useDtoStoreDelete';

const serviceCategoryProperties: StringPropertyNames<ServiceCategoryDto>[] = [
  'knowledgeDomainDescriptor',
  'knowledgeLevelDescriptor'
];

function InternalUiComponent({
  entity,
  dispatchWithoutControl,
  ...otherProps
}: DtoUiComponentProps<ServiceCategoryDto>) {
  const update = (
    value: string,
    attributeKey: StringPropertyNames<ServiceCategoryDto>
  ) => {
    if (dispatchWithoutControl === undefined) return;
    dispatchWithoutControl((entity) => ({ ...entity, [attributeKey]: value }));
  };
  const { deleted } = useDtoStoreDelete(
    otherProps.entityClass,
    entity.id,
    'card'
  );

  return (
    <Card className={'relative'}>
      <DeletedOverlay show={deleted} />
      <CardHeader>
        <DtoComponentWrapper<ServiceCategoryDto>
          {...otherProps}
          id={entity.id}
          uiComponent={(props) => (
            <EditTextDeleteEntityPopover
              {...props}
              listenerKey={'card'}
              textAccessor={(ent) => ent.name}
              textSetter={(ent, value) => ({ ...ent, name: value })}
            />
          )}
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
    <DtoComponentWrapper
      uiComponent={InternalUiComponent}
      id={id}
      entityClass={EntityClassMap.serviceCategory}
    />
  );
}
