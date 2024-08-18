import { EntityClassMap } from '@/api/entity-class-map';
import WpssEditGridColList from '@/app/work-project-series-schemas/_components/WpssEditGridColList';
import { workProjectSeriesSchemaActionSequence } from '@/app/work-project-series-schemas/_functions/workProjectSeriesSchemaActionSequence';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkProjectSeriesSchema';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-domains/KnowledgeLevelSeriesLinks';
import { KnowledgeLevelLinks } from '@/app/work-project-series-schemas/KnowledgeLevelLinks';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

async function WorkProjectSeriesSchemaLevelTable({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [serviceCategoryId, levelOrdinal] = getLastNVariables(pathVariables, 2);

  const { workProjectSeriesSchemas: wpssData } =
    await workProjectSeriesSchemaActionSequence({
      knowledgeLevel: { levelOrdinal: parseInt(levelOrdinal) },
      serviceCategoryId: parseInt(serviceCategoryId)
    });

  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={wpssData}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
        postServerAction={postList}
      />
      <WpssEditGridColList />
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
      subRouteComponent={WorkProjectSeriesSchemaLevelTable}
    />
  );
}
