'use client';

import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSeriesSchemaBundleDto } from '@/api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { Chip } from '@nextui-org/chip';
import { NamespacedHooks, useDtoStore } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';

import { initialMap } from '@/app/_literals';

export default function BundleItemWithInclusionCount({ id }: { id: string }) {
  const { entity } = useDtoStore<WorkProjectSeriesSchemaDto>({
    entityId: id,
    entityClass: EntityClassMap.workProjectSeriesSchema
  });

  const { currentState: bundleMap } = NamespacedHooks.useListen(
    EntityClassMap.workSeriesSchemaBundle,
    KEY_TYPES.MASTER_MAP,
    id,
    initialMap as Map<string, WorkSeriesSchemaBundleDto>
  );

  const inclusionCount = [...bundleMap.values()].filter(
    (bundle) => bundle && bundle.workProjectSeriesSchemaIds.includes(id)
  ).length;

  return (
    <div className={'flex justify-between'}>
      <span>{entity.name}</span>{' '}
      <Chip
        size={'sm'}
        classNames={{ base: 'py-0.5 h-fit' }}
        color={
          inclusionCount === 0
            ? 'default'
            : inclusionCount === 1
              ? 'success'
              : 'warning'
        }
      >
        {inclusionCount}
      </Chip>
    </div>
  );
}
