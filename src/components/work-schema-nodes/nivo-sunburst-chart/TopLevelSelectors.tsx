'use client';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/CreateViaSunburst';

import FilteredEntitySelector from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { useRef } from 'react';
import {
  HasName,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { getDomainAlias } from '@/api/getDomainAlias';

export default function TopLevelSelectors() {
  const filteredItems = useRef([] as KnowledgeLevelDto[]);
  const filteredItemsWttN = useRef([] as (HasNumberId & HasName)[]);
  return (
    <div className={'w-32'}>
      <FilteredEntitySelector
        entityClass={EntityClassMap.knowledgeLevel}
        filteredItems={filteredItems}
        labelAccessor={'name'}
        label={getDomainAlias('knowledgeLevel')}
      />
      <FilteredEntitySelector
        entityClass={workTaskTypeName}
        filteredItems={filteredItemsWttN}
        labelAccessor={'name'}
        label={'Task Type'}
      />
    </div>
  );
}
