'use client';
import React, { CSSProperties, useMemo } from 'react';

import { EntityClassMap } from '@/api/entity-class-map';
import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { getDomainAlias } from '@/api/getDomainAlias';
import { startCase } from 'lodash';
import { Column } from '@/types';
import {
  ColorDto,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';
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

export function parseToCssRgba(color: ColorDto | undefined) {
  if (!color) return undefined;
  const { r, g, b, a } = color;

  // Ensure that r, g, and b are integers between 0 and 255, and a is a float between 0 and 1.
  const red = Math.min(255, Math.max(0, r));
  const green = Math.min(255, Math.max(0, g));
  const blue = Math.min(255, Math.max(0, b));
  const alpha = Math.min(1, Math.max(0, a));

  // Return the CSS rgba string
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function ShortCodeEditButtonCell(
  props: NextUiCellComponentProps<KnowledgeDomainDto>
) {
  const classNames = useMemo(() => {
    const {
      entity: { shortCode, color }
    } = props;
    const shortCodeColor = getShortCodeColor(shortCode ?? '');
    return shortCodeColor !== 'bg-white' ? { button: shortCodeColor } : {};
  }, [props]);

  const style = useMemo(() => {
    const {
      entity: { shortCode, color }
    } = props;
    return parseToCssRgba(color);
  }, []);

  const styleAndClassnames = useMemo(() => {
    if (style) {
      const cssStyle: CSSProperties = {
        backgroundColor: style
      };
      return { style: cssStyle };
    } else return { classNames };
  }, [style, classNames]);

  return (
    <EditStringUniqueConstraintButton {...props} {...styleAndClassnames} />
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

const cellRenderFunction = getCellRenderFunction('knowledgeDomain', {
  name: RenameAndDeleteCell,
  shortCode: ShortCodeEditButtonCell
});
