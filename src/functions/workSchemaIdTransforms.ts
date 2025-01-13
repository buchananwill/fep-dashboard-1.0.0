import {
  SuitabilitySummaryDto,
  WorkSchemaDto,
  WorkSchemaSummaryId,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { getIntListFromDeliveryAllocations } from '@/components/react-flow/work-schema-node/functions/getIntListFromDeliveryAllocations';

const NUMBER_OF_WPSS_VIEW_ID_ARGS = 4;

function getOrderItemWpssSummaryIdList(
  orderItems: string
): WorkSchemaSummaryId[] {
  return orderItems
    .split(';')
    .map((item) => item.split('::'))
    .filter((parts) => parts.length === NUMBER_OF_WPSS_VIEW_ID_ARGS)
    .map((parts) => ({
      taskTypeName: parts[0],
      knowledgeDomainName: parts[1],
      knowledgeLevelName: parts[2],
      allocationList: parts[3]
    }));
}

function splitOrderItemsIntoLutKeys(orderItems: string) {
  return orderItems.split(';');
}

export function joinWorkSchemaIdKey(wpss: WorkSchemaDto) {
  const allocationList = getIntListFromDeliveryAllocations(
    wpss.deliveryAllocations
  ).join(',');
  return [joinWorkTypeKey(wpss.workType), allocationList].join('::');
}

export function joinWorkTypeKey(workType: WorkTypeDto | undefined) {
  if (workType === undefined) throw Error('WorkType was undefined');
  return [
    workType.name,
    workType.knowledgeDomain.name,
    workType.knowledgeLevel?.name
  ].join('::');
}
export function joinWorkTypeKeyFromSuitability(
  suitabilitySummary: SuitabilitySummaryDto | undefined
) {
  if (suitabilitySummary === undefined) throw Error('WorkType was undefined');
  return [
    suitabilitySummary.workTypeCategory,
    suitabilitySummary.knowledgeDomainName,
    suitabilitySummary.knowledgeLevelName
  ].join('::');
}

export type WorkSchemaCanonicalLut = Record<string, WorkSchemaDto>;

export function convertWorkProjectSeriesListIntoLut(
  list: WorkSchemaDto[]
): WorkSchemaCanonicalLut {
  const lut = {} as WorkSchemaCanonicalLut;
  list.forEach((dto) => {
    lut[joinWorkSchemaIdKey(dto)] = dto;
  });
  return lut;
}
