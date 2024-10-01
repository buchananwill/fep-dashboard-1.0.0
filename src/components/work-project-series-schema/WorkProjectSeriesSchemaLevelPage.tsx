import { EntityClassMap } from '@/api/entity-class-map';
import WorkProjectSeriesSchemaEditTable from '@/components/tables/edit-tables/WorkProjectSeriesSchemaEditTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkProjectSeriesSchema';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';

async function WorkProjectSeriesSchemaLevelPage(props: LeafComponentProps) {
  const { pathVariables } = props;
  const [knowledgeLevelSeriesId, levelOrdinal] = getLastNVariables(
    pathVariables,
    2
  );
  const availableCycles = await Api.Cycle.getAll();

  const wpssData = await Api.WorkProjectSeriesSchema.getDtoListByExampleList([
    {
      workTaskType: {
        knowledgeLevel: {
          levelOrdinal: parseInt(levelOrdinal),
          knowledgeLevelSeriesId: parseInt(knowledgeLevelSeriesId)
        }
      }
    }
  ]);

  return (
    <>
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
      <WorkProjectSeriesSchemaEditTable {...props} />
    </>
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
