import { LeafComponentProps } from '@/app/core/navigation/types';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { CycleSubspanWithJoinsListDto } from '@/api/dtos/CycleSubspanWithJoinsListDtoSchema_';
import { StaticDeliveryAllocationItemDto } from '@/api/dtos/StaticDeliveryAllocationItemDtoSchema';
import StaticAllocationTable from '@/app/work-project-series-schemas/static-allocation/StaticAllocationTable';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';

export type StaticAllocationTableDto = GenericTableDto<
  WorkProjectSeriesSchemaDto,
  CycleSubspanWithJoinsListDto,
  StaticDeliveryAllocationItemDto
>;

export async function StaticAllocationPage({
  pathVariables
}: LeafComponentProps) {
  // const [cycleId] = getLastNVariables(pathVariables, 1);

  const staticDeliveryTable = await getWithoutBody<StaticAllocationTableDto>(
    constructUrl(
      `/api/v2/staticDeliveryAllocationItems/staticAllocationTable/${1}`
    )
  );

  const initialStaticAllocations = Object.values(
    staticDeliveryTable.cellIdCellContentMap
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.staticDeliveryAllocationItem}
        dtoList={initialStaticAllocations}
        updateServerAction={Api.StaticDeliveryAllocationItem.putList}
      />
      <MasterMapController
        entityClass={EntityClassMap.staticDeliveryAllocationItem}
      />
      <StaticAllocationTable tableData={staticDeliveryTable} />
    </>
  );
}
