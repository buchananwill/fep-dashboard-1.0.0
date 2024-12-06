import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';
import { WorkTaskTypeActionCell } from '@/components/tables/cells-v2/WorkTaskTypeActionCell';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import {
  AnyValueToString,
  SimpleValueToStringOrUndefined
} from '@/components/tables/cells-v2/generic/AnyValueToString';
import EmbeddedKnowledgeDomainCell from '@/components/tables/cells-v2/specific/EmbeddedKnowledgeDomainCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';

const CellRecord: CellComponentRecord<WorkTaskTypeDto> = {
  id: { component: WorkTaskTypeActionCell, type: 'IdInnerCell' },
  name: { component: AnyValueToString, type: 'IdInnerCell' },
  'knowledgeLevel.name': {
    component: SimpleValueToStringOrUndefined,
    type: 'IdInnerCell'
  },
  'knowledgeLevel.levelOrdinal': {
    component: AnyValueToString,
    type: 'IdInnerCell'
  },
  'knowledgeDomain.name': {
    component: EmbeddedKnowledgeDomainCell,
    type: 'EntityInnerCell'
  },
  'knowledgeDomain.shortCode': {
    component: EmbeddedKnowledgeDomainCell,
    type: 'EntityInnerCell'
  }
};

export const WorkTaskTypeCell = getCellRenderFunction(
  'workTaskType',
  CellRecord
);
