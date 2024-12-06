import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { GenericTableDto } from '@/api/types';
import { CycleSubspanWithJoinsListDto } from '@/api/generated-types/generated-types_';
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
} from '@/api/generated-types/generated-types_';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { getCellDataIdReferenceOrUndefined } from '@/components/work-project-series-schema/static-allocation/getCellDataOrUndefined';
import { getTableProps } from '@/components/grids/useTableProps';
import { createCell } from '@/components/work-project-series-schema/static-allocation/createCell';
import { IdListLinkCard } from '@/components/generic/IdListLinkCard';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { Suspense } from 'react';
import When_loading from '@/app/core/when_loading';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

export type StaticAllocationTableDto = GenericTableDto<
  WorkProjectSeriesSchemaDto,
  CycleSubspanWithJoinsListDto,
  StaticDeliveryAllocationItemDto,
  number
>;

function StaticAllocationPage(props: LeafComponentProps) {
  return (
    <Suspense fallback={<When_loading />}>
      <InnerStaticAllocationPage {...props} />
    </Suspense>
  );
}

async function InnerStaticAllocationPage({
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

  const cellDataOrUndefined =
    getCellDataIdReferenceOrUndefined(staticDeliveryTable);
  const initialList = getTableProps(
    staticDeliveryTable.rowList,
    staticDeliveryTable.columnList
  )
    .itemData.flatMap((list) => [...list])
    .map(({ rowId, columnId }) =>
      createCell(
        EntityClassMap.staticDeliveryAllocationItem,
        String(rowId),
        String(columnId),
        cellDataOrUndefined.memoizedFunction({ rowId, columnId })
      )
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
        entityClass={CellEntityClass}
        dtoList={initialList}
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
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <StaticAllocationTable tableData={staticDeliveryTable} />
      </RootCard>
    </>
  );
}

async function ChooseCycleReference({
  pathVariables,
  depth
}: LeafComponentProps) {
  const cycleIdList = await Api.Cycle.getIdList();

  return (
    <IdListLinkCard
      pathVariables={pathVariables}
      depth={depth + 1}
      idList={cycleIdList}
      entityClass={EntityClassMap.cycle}
    />
  );
}

export const StaticAllocationHome = getPathVariableSplitComponent(
  ChooseCycleReference,
  StaticAllocationPage
);
