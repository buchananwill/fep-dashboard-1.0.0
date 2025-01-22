import { EntityClassMap } from '@/api/entity-class-map';
import WorkSchemaEditTable from '@/components/tables/edit-tables/WorkSchemaEditTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkSchema';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

async function WorkSchemaLevelPage(props: LeafComponentProps) {
  const { pathVariables } = props;
  const [knowledgeLevelSeriesId, levelOrdinal] = getLastNVariables(
    pathVariables,
    2
  );
  const availableCycles = await Api.Cycle.getAll();

  const wpssData = await Api.WorkSchema.getDtoListByExampleList([
    {
      workType: {
        knowledgeLevel: {
          levelOrdinal: parseInt(levelOrdinal),
          knowledgeLevelSeriesId: parseInt(knowledgeLevelSeriesId)
        }
      }
    }
  ]);

  return (
    <div className={'p-4'}>
      <EditAddDeleteDtoControllerArray
        dtoList={wpssData}
        entityClass={EntityClassMap.workSchema}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
        postServerAction={postList}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.cycle}
        dtoList={availableCycles}
      />
      <WorkSchemaEditTable {...props} />
    </div>
  );
}

export default function WorkSchemaHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelSeriesLinks}
      subRouteComponent={WorkProjectLevelLinks}
    />
  );
}

function WorkProjectLevelLinks(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelLinks}
      subRouteComponent={WorkSchemaLevelPage}
    />
  );
}
