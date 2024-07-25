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
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';
import { ServiceCategoryLevelLinks } from '@/app/work-project-series-schemas/ServiceCategoryLevelLinks';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

async function WorkProjectSeriesSchemaLevelTable({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [serviceCategoryId, levelOrdinal] = getLastNVariables(pathVariables, 2);

  const { workProjectSeriesSchemas: wpssData } =
    await workProjectSeriesSchemaActionSequence({
      knowledgeLevelLevelOrdinal: parseInt(levelOrdinal),
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
      homeComponent={ServiceCategoryLinks}
      subRouteComponent={WorkProjectSeriesLevelLinks}
    />
  );
}

function WorkProjectSeriesLevelLinks(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={ServiceCategoryLevelLinks}
      subRouteComponent={WorkProjectSeriesSchemaLevelTable}
    />
  );
}
