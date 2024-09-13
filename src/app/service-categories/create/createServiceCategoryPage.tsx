'use client';
import { EntityClassMap } from '@/api/entity-class-map';

import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';
import data from '@/utils/init-json-data/service-categories/ServiceCategory.json';
import { Button } from '@nextui-org/button';
import { useGlobalReadAny } from 'selective-context';
import { SelectiveContextReadAll } from 'selective-context/dist/types';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import { initKnowledgeLevels } from '@/utils/init-database-functions/operations/initKnowledgeLevels';
import { initOrganizationTypes } from '@/utils/init-database-functions/resources/initOrganizationTypes';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { Api } from '@/api/clientApi_';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';

const entityName = EntityClassMap.knowledgeLevelSeries;

const handleSubmit = async (
  selectiveContextReadAll: SelectiveContextReadAll<KnowledgeLevelSeriesDto>
) => {
  const knowledgeLevelSeries = selectiveContextReadAll(
    `${entityName}:${ABSOLUTE_SMALLEST_TRANSIENT_ID}`
  );
  if (knowledgeLevelSeries) {
    const klSeriesResponse = await initSafely(
      () =>
        Api.KnowledgeLevelSeries.getDtoListByExampleList([
          knowledgeLevelSeries
        ]),
      () => Api.KnowledgeLevelSeries.postOne(knowledgeLevelSeries)
    );
    let knowledgeLevelSeries: KnowledgeLevelSeriesDto | undefined = undefined;
    if (Array.isArray(klSeriesResponse)) {
      knowledgeLevelSeries = klSeriesResponse[0];
    } else knowledgeLevelSeries = klSeriesResponse;
    if (knowledgeLevelSeries) {
      const promiseLevels = initKnowledgeLevels(knowledgeLevelSeries);
      const orgTypes = initOrganizationTypes(
        knowledgeLevelSeries,
        promiseLevels
      );
      await Promise.all([promiseLevels, orgTypes]);
    }
    return knowledgeLevelSeries?.id;
  }
};

export default function CreateServiceCategoryPage() {
  const [template] = data;

  const [pending, startTransition] = useTransition();

  const appRouterInstance = useRouter();

  template.id = ABSOLUTE_SMALLEST_TRANSIENT_ID;

  const selectiveContextReadAll = useGlobalReadAny<KnowledgeLevelSeriesDto>();

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={entityName}
        dtoList={[template]}
      />
      <div className={'relative, h-fit w-fit'}>
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
