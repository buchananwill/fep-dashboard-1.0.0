import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import WorkTaskTypeEditTable from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { spyOnResponse } from '@/functions/spyOnResponse';

export default async function WorkTaskTypeTablePage({}: LeafComponentProps) {
  const wtts = await Api.WorkTaskType.getAll();

  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={wtts}
        entityClass={EntityClassMap.workTaskType}
        postServerAction={Api.WorkTaskType.postList}
        deleteServerAction={Api.WorkTaskType.deleteIdList}
        updateServerAction={Api.WorkTaskType.putList}
      />
      <WorkTaskTypeEditTable />
    </>
  );
}
