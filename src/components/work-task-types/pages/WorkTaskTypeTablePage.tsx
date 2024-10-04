import { Api } from '@/api/clientApi_';
import WorkTaskTypeEditTable from '@/components/tables/edit-tables/WorkTaskTypeEditTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import RootCard from '@/components/generic/RootCard';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function WorkTaskTypeTablePage({
  pathVariables
}: LeafComponentProps) {
  const wtts = await Api.WorkTaskType.getAll();

  return (
    <div className={'p-4'}>
      <RootCard layoutId={'/' + ['core', ...pathVariables].join('/')}>
        <EditAddDeleteDtoControllerArray
          dtoList={wtts}
          entityClass={EntityClassMap.workTaskType}
          postServerAction={Api.WorkTaskType.postList}
          deleteServerAction={Api.WorkTaskType.deleteIdList}
          updateServerAction={Api.WorkTaskType.putList}
        />
        <WorkTaskTypeEditTable />
      </RootCard>
    </div>
  );
}
