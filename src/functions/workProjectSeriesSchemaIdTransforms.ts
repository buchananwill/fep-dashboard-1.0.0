import {
  WorkProjectSeriesSchemaDto,
  WorkProjectSeriesSchemaSummaryId
} from '@/api/generated-types/generated-types';
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
  return [
    wpss.workTaskType.name,
    wpss.workTaskType.knowledgeDomain.name,
    wpss.workTaskType.knowledgeLevel?.name,
    allocationList
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
