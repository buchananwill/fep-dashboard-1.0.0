import {
  SuitabilitySummaryDto,
  WorkProjectSeriesSchemaDto,
  WorkProjectSeriesSchemaSummaryId,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { getIntListFromDeliveryAllocations } from '@/components/react-flow/work-schema-node/functions/getIntListFromDeliveryAllocations';

const NUMBER_OF_WPSS_VIEW_ID_ARGS = 4;

function getOrderItemWpssSummaryIdList(
  orderItems: string
): WorkProjectSeriesSchemaSummaryId[] {
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

export function joinWorkProjectSeriesSchemaIdKey(
  wpss: WorkProjectSeriesSchemaDto
) {
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
    suitabilitySummary.taskTypeName,
    suitabilitySummary.knowledgeDomainName,
    suitabilitySummary.knowledgeLevelName
  ].join('::');
}

export type WorkProjectSeriesSchemaCanonicalLut = Record<
  string,
  WorkProjectSeriesSchemaDto
>;

export function convertWorkProjectSeriesListIntoLut(
  list: WorkProjectSeriesSchemaDto[]
): WorkProjectSeriesSchemaCanonicalLut {
  const lut = {} as WorkProjectSeriesSchemaCanonicalLut;
  list.forEach((dto) => {
    lut[joinWorkProjectSeriesSchemaIdKey(dto)] = dto;
  });
  return lut;
}
