import {
  getCellRenderFunction,
  NextUiCellComponentProps
} from '@/components/tables/GetCellRenderFunction';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { StringValueChip } from '@/components/tables/StringValueChip';
import { DeleteEntity } from '@/components/tables/cells/DeleteEntity';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { WorkTaskTypeActionCell } from '@/components/tables/cells/WorkTaskTypeActionCell';

export const WorkTaskTypeCell = getCellRenderFunction('workTaskType', {
  id: WorkTaskTypeActionCell,
  name: SimpleValueToString,
  'knowledgeDomain.name': SimpleValueToString,
  'knowledgeLevel.levelOrdinal': SimpleValueToString,
  'knowledgeDomain.shortCode': StringValueChip,
  'knowledgeLevel.name': SimpleValueToString
});
