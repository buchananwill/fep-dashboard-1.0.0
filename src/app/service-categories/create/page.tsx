'use client';
import { EntityClassMap } from '@/api/entity-class-map';

import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';
import data from '@/utils/init-json-data/service-categories/ServiceCategory.json';
import { TransientIdOffset } from '@/api/main';
import { Button } from '@nextui-org/button';
import { useGlobalReadAny } from 'selective-context';
import { SelectiveContextReadAll } from 'selective-context/dist/types';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import {
  getDtoListByExampleList,
  postOne
} from '@/api/generated-actions/ServiceCategory';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import { initKnowledgeDomains } from '@/utils/init-database-functions/initKnowledgeDomains';
import { initKnowledgeLevels } from '@/utils/init-database-functions/initKnowledgeLevels';

const entityName = EntityClassMap.serviceCategory;

const handleSubmit = async (
  selectiveContextReadAll: SelectiveContextReadAll<ServiceCategoryDto>
) => {
  const serviceCategory = selectiveContextReadAll(
    `${entityName}:${TransientIdOffset}`
  );
  if (serviceCategory) {
    const serviceCategoryResponse = await initSafely(
      () => getDtoListByExampleList([serviceCategory]),
      () => postOne(serviceCategory)
    );
    let serviceCategoryDto: ServiceCategoryDto | undefined = undefined;
    if (Array.isArray(serviceCategoryResponse)) {
      serviceCategoryDto = serviceCategoryResponse[0];
    } else serviceCategoryDto = serviceCategoryResponse;
    if (serviceCategoryDto) {
      const promiseDomains = initKnowledgeDomains(serviceCategoryDto);
      const promiseLevels = initKnowledgeLevels(serviceCategoryDto);
      await Promise.all([promiseDomains, promiseLevels]);
    }
    return serviceCategoryDto?.id;
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
      <div className={'relative, w-fit h-fit'}>
        <PendingOverlay pending={pending} />
        <ServiceCategoryCard id={template.id} />
      </div>
      <Button
        onPress={() => {
          startTransition(async () => {
            const id = await handleSubmit(selectiveContextReadAll);
            if (id)
              appRouterInstance.push(
                `/service-categories/${id}/knowledge-domains`
              );
          });
        }}
      >
        Create New Category
      </Button>
    </>
  );
}
