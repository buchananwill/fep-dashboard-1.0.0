'use client';
import { EntityClassMap } from '@/api/entity-class-map';

import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';
import data from '@/utils/init-json-data/service-categories/ServiceCategory.json';
import { TransientIdOffset } from '@/api/main';
import { Button } from '@nextui-org/button';
import { useGlobalReadAny } from 'selective-context';
import { SelectiveContextReadAll } from 'selective-context/dist/types';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import { postOne } from '@/api/generated-actions/ServiceCategory';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';

const entityName = EntityClassMap.serviceCategory;

const handleSubmit = async (
  selectiveContextReadAll: SelectiveContextReadAll<ServiceCategoryDto>
) => {
  const serviceCategory = selectiveContextReadAll(
    `${entityName}:${TransientIdOffset}`
  );
  if (serviceCategory) {
    const serviceCategoryDto = await postOne(serviceCategory);
    return serviceCategoryDto.id;
  }
};

export default function Page() {
  const [template] = data;

  const [pending, startTransition] = useTransition();

  const appRouterInstance = useRouter();

  template.id = TransientIdOffset;

  const selectiveContextReadAll = useGlobalReadAny<ServiceCategoryDto>();

  console.log(data);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.serviceCategory}
        dtoList={[template]}
      />
      <ServiceCategoryCard id={template.id} />
      <Button
        onPress={() => {
          startTransition(async () => {
            const id = await handleSubmit(selectiveContextReadAll);
            if (id) appRouterInstance.push(`/service-categories/${id}`);
          });
        }}
      >
        Create New Category
      </Button>
    </>
  );
}
