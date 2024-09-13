import { EntityClassMap } from '@/api/entity-class-map';
import WorkProjectSeriesSchemaEditTable from '@/components/tables/edit-tables/WorkProjectSeriesSchemaEditTable';
import { workProjectSeriesSchemaActionSequence } from '@/app/work-project-series-schemas/_functions/workProjectSeriesSchemaActionSequence';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkProjectSeriesSchema';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { KnowledgeLevelLinks } from '@/app/work-project-series-schemas/KnowledgeLevelLinks';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { Api } from '@/api/clientApi_';

async function WorkProjectSeriesSchemaLevelPage({
  pathVariables
}: LeafComponentProps) {
  const [knowledgeLevelSeriesId, levelOrdinal] = getLastNVariables(
    pathVariables,
    2
  );
  const availableCycles = await Api.Cycle.getAll();

  const { workProjectSeriesSchemas: wpssData, workTaskTypes } =
    await workProjectSeriesSchemaActionSequence({
      knowledgeLevel: {
        levelOrdinal: parseInt(levelOrdinal),
        knowledgeLevelSeriesId: parseInt(knowledgeLevelSeriesId)
      }
    });

  console.log(workTaskTypes);

  return (
    <div className={'flex h-[100vh] w-[100vw]'}>
      <EditAddDeleteDtoControllerArray
        dtoList={wpssData}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
        postServerAction={postList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycle}
        dtoList={availableCycles}
      />
      <WorkProjectSeriesSchemaEditTable />
    </div>
  );
}

export default function WorkProjectSeriesSchemaHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelSeriesLinks}
      subRouteComponent={WorkProjectSeriesLevelLinks}
    />
  );
}

function WorkProjectSeriesLevelLinks(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelLinks}
      subRouteComponent={WorkProjectSeriesSchemaLevelPage}
    />
  );
}
