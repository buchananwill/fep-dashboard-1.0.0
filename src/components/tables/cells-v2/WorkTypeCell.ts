import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { WorkTypeActionCell } from '@/components/tables/cells-v2/WorkTypeActionCell';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import {
  AnyValueToString,
  SimpleValueToStringOrUndefined
} from '@/components/tables/cells-v2/generic/AnyValueToString';
import EmbeddedKnowledgeDomainCell from '@/components/tables/cells-v2/specific/EmbeddedKnowledgeDomainCell';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';

const CellRecord: CellComponentRecord<WorkTypeDto> = {
  id: { component: WorkTypeActionCell, type: 'IdInnerCell' },
  'workTypeCategory.name': { component: AnyValueToString, type: 'IdInnerCell' },
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

export const WorkTypeCell = getCellRenderFunction('workType', CellRecord);
