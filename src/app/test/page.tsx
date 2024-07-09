import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import TreeViewWrapper from '@/app/test/TreeViewWrapper';
import { FeasibilityReportFullDto } from '@/api/dtos/FeasibilityReportFullDtoSchema';
import { DataFetchingEditDtoControllerArray, EmptyArray } from 'dto-stores';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';

export default async function page() {
  const feasibilityReportFullDto: FeasibilityReportFullDto =
    await getWithoutBody(
      constructUrl('/api/v2/resourceMetrics/feasibilityReport/152')
    );

  return (
    <>
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.WorkTaskType.getDtoListByBodyList}
        entityClass={EntityClassMap.workTaskType}
      />
      <TreeViewWrapper report={feasibilityReportFullDto} />
    </>
  );
}
