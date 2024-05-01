'use client';
import DtoIdListChangesTracker from '@/components/generic/DtoChangesTracker';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import ServiceCategoryCard from '@/app/service-categories/components/ServiceCategoryCard';
import data from '@/utils/init-json-data/service-categories/ServiceCategory.json';
import { TransientIdOffset } from '@/app/api/main';
import { Button } from '@nextui-org/button';
import { useSelectiveContextGlobalReadAll } from 'selective-context';
import { SelectiveContextReadAll } from 'selective-context/dist/types';
import { ServiceCategoryDto } from '@/app/api/dtos/ServiceCategoryDtoSchema';
import { postOne } from '@/app/api/generated-actions/ServiceCategory';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
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

  const selectiveContextReadAll =
    useSelectiveContextGlobalReadAll<ServiceCategoryDto>();

  return (
    <>
      <DtoIdListChangesTracker dtoList={data} entityName={entityName} />
      <DtoController dto={data[0]} entityName={entityName} />
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
