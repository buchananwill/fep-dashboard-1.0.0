import { LeafComponentProps } from '@/app/core/navigation/types';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { CycleSubspanWithJoinsListDto } from '@/api/generated-types/generated-types';
import StaticAllocationTable from '@/components/work-project-series-schema/static-allocation/StaticAllocationTable';
import {
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import StaticAllocationAuditor, {
  allocationCounter
} from '@/components/work-project-series-schema/static-allocation/StaticAllocationAuditor';
import { EmptyArray } from '@/api/literals';
import {
  StaticDeliveryAllocationItemDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { getLastNVariables } from '@/functions/getLastNVariables';

export type StaticAllocationTableDto = GenericTableDto<
  WorkProjectSeriesSchemaDto,
  CycleSubspanWithJoinsListDto,
  StaticDeliveryAllocationItemDto,
  number
>;

export async function StaticAllocationPage({
  pathVariables
}: LeafComponentProps) {
  const [cycleId] = getLastNVariables(pathVariables, 1);

  const staticDeliveryTable = await getWithoutBody<StaticAllocationTableDto>(
    constructUrl(
      `/api/v2/staticDeliveryAllocationItems/staticAllocationTable/${cycleId}`
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
        deleteServerAction={Api.StaticDeliveryAllocationItem.deleteIdList}
        postServerAction={Api.StaticDeliveryAllocationItem.postList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycleSubspan}
        dtoList={staticDeliveryTable.columnList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={staticDeliveryTable.rowList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={'Cell'}
        dtoList={EmptyArray}
      />
      <StaticAllocationAuditor />
      <MasterMapController
        entityClass={EntityClassMap.staticDeliveryAllocationItem}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={allocationCounter}
        dtoList={EmptyArray}
        mergeInitialWithProp={true}
      />
      <StaticAllocationTable tableData={staticDeliveryTable} />
    </>
  );
}
