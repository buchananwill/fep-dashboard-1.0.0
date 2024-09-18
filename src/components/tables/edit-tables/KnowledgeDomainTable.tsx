'use client';
import React, { useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { Column } from '@/types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import FilterSelectEntityTable from '@/components/tables/FilterSelectEntityTable';
import {
  getCellRenderFunction,
  NextUiCellComponentProps
} from '@/components/tables/GetCellRenderFunction';
import { RenameAndDeleteCell } from '@/components/work-project-series-schema/_components/RenameAndDeleteCell';
import { useFilterOutDeletedEntities } from '@/hooks/useFilterOutDeletedEntities';
import { EditStringUniqueConstraintButton } from '@/components/tables/edit-tables/EditStringUniqueConstraintButton';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import { useMasterListToCreate } from '@/components/knowledge-levels/useMasterListToCreate';

export function KnowledgeDomainTable() {
  const entities = useFilterOutDeletedEntities<KnowledgeDomainDto>(entityType);

  const createHandler = useMasterListToCreate(domainFactory, entityType);

  return (
    <FilterSelectEntityTable
      columns={columns}
      addRow={createHandler}
      entityClass={entityType}
      entities={entities}
      isCompact={true}
      selectionMode={'none'}
      initialColumns={['name', 'shortCode']}
      filterProperty={'name'}
      renderCell={cellRenderFunction}
      classNames={{
        tr: 'py-0',
        td: 'py-0.5',
        wrapper: 'h-[60vh] w-[40vw]'
      }}
    />
  );
}

const getDomainFactory = () => {
  let nextId = ABSOLUTE_SMALLEST_TRANSIENT_ID;
  return function () {
    const newDomain: KnowledgeDomainDto = {
      id: nextId,
      name: `${getDomainAlias('knowledgeDomain')} ${nextId * -1}`
    };
    nextId--;
    return newDomain;
  };
};

const domainFactory = getDomainFactory();

function ShortCodeEditButtonCell(
  props: NextUiCellComponentProps<KnowledgeDomainDto>
) {
  const classNames = useMemo(() => {
    const {
      entity: { shortCode }
    } = props;
    const shortCodeColor = getShortCodeColor(shortCode ?? '');
    return shortCodeColor !== 'bg-white' ? { button: shortCodeColor } : {};
  }, [props]);

  return (
    <EditStringUniqueConstraintButton {...props} classNames={classNames} />
  );
}

const columns: Column<KnowledgeDomainDto>[] = [
  {
    name: startCase(getDomainAlias('knowledgeDomain')),
    uid: 'name',
    sortable: true
  },
  { name: 'ShortCode', uid: 'shortCode', sortable: true }
];

const entityType = EntityClassMap.knowledgeDomain;

const cellRenderFunction = getCellRenderFunction<KnowledgeDomainDto>(
  {
    name: RenameAndDeleteCell,
    shortCode: ShortCodeEditButtonCell
  },
  entityType
);
