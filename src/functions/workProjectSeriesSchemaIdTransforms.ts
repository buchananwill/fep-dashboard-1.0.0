import {
  WorkProjectSeriesSchemaDto,
  WorkProjectSeriesSchemaSummaryId,
  WorkTaskTypeDto
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
  return [joinWorkTaskTypeKey(wpss.workTaskType), allocationList].join('::');
}

export function joinWorkTaskTypeKey(workTaskType: WorkTaskTypeDto | undefined) {
  if (workTaskType === undefined) throw Error('WorkTaskType was undefined');
  return [
    workTaskType.name,
    workTaskType.knowledgeDomain.name,
    workTaskType.knowledgeLevel?.name
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
