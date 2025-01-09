import { Api } from '@/api/clientApi_';
import WorkTypeEditTable from '@/components/tables/edit-tables/WorkTypeEditTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import RootCard from '@/components/generic/RootCard';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function WorkTypeTablePage({
  pathVariables
}: LeafComponentProps) {
  const wtts = await Api.WorkType.getAll();

  return (
    <div className={'p-4'}>
      <RootCard layoutId={'/' + ['core', ...pathVariables].join('/')}>
        <EditAddDeleteDtoControllerArray
          dtoList={wtts}
          entityClass={EntityClassMap.workType}
          postServerAction={Api.WorkType.postList}
          deleteServerAction={Api.WorkType.deleteIdList}
          updateServerAction={Api.WorkType.putList}
        />
        <WorkTypeEditTable />
      </RootCard>
    </div>
  );
}
