'use client';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';

import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { useRef } from 'react';
import {
  CycleDto,
  HasName,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { getDomainAlias } from '@/api/getDomainAlias';

export default function TopLevelSelectors() {
  const filteredItems = useRef([] as KnowledgeLevelDto[]);
  const filteredItemsWttN = useRef([] as (HasNumberId & HasName)[]);
  const filteredItemsCycle = useRef([] as CycleDto[]);
  return (
    <div className={'grid grid-cols-2 gap-2 p-2'}>
      <FilteredEntitySelector
        entityClass={workTaskTypeName}
        filteredItems={filteredItemsWttN}
        labelAccessor={'name'}
        label={'Task Type'}
      />
      <FilteredEntitySelector
        entityClass={EntityClassMap.cycle}
        filteredItems={filteredItemsCycle}
        labelAccessor={'id'}
        label={'Cycle'}
      />
    </div>
  );
}
