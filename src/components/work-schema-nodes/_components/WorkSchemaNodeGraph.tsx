import { ForceGraphPage, ForceGraphPageAllProps } from 'react-d3-force-wrapper';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import { ReactFlowWrapper } from '@/components/react-flow/generic/components/wrappers/ReactFlowWrapper';
import { WorkSchemaNodeLayoutFlowWithForces } from '@/components/react-flow/work-schema-node/WorkSchemaNodeLayoutFlowWithForces';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import React from 'react';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';

export default function WorkSchemaNodeGraph({
  forceGraphPageProps,
  schemas,
  unassignedRootList
}: {
  forceGraphPageProps: ForceGraphPageAllProps<WorkSchemaNodeDto>;
  schemas: WorkProjectSeriesSchemaDto[];
  unassignedRootList: WorkSchemaNodeDto[];
}) {
  return (
    <ForceGraphPage {...forceGraphPageProps}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={schemas}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workSchemaNode}
        dtoList={unassignedRootList}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.CarouselOption.getDtoListByBodyList}
        entityClass={EntityClassMap.carouselOption}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.Carousel.getDtoListByBodyList}
        entityClass={EntityClassMap.carousel}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        getServerAction={Api.CarouselGroup.getDtoListByBodyList}
        entityClass={EntityClassMap.carouselGroup}
      />
      <ReactFlowWrapper>
        <WorkSchemaNodeLayoutFlowWithForces></WorkSchemaNodeLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}
