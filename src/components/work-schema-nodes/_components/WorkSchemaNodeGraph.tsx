import { ForceGraphPage, ForceGraphPageAllProps } from 'react-d3-force-wrapper';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  EmptyArray
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { Api } from '@/api/clientApi_';
import { ReactFlowWrapper } from '@/components/react-flow/generic/components/wrappers/ReactFlowWrapper';
import { WorkSchemaNodeLayoutFlowWithForces } from '@/components/react-flow/work-schema-node/components/WorkSchemaNodeLayoutFlowWithForces';
import React from 'react';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';
import { EdgeAnimationContextType } from '@/components/react-flow/generic/components/wrappers/edgeAnimationContext';

export default function WorkSchemaNodeGraph({
  forceGraphPageProps,
  unassignedRootList
}: {
  forceGraphPageProps: ForceGraphPageAllProps<WorkSchemaNodeDto>;
  unassignedRootList: WorkSchemaNodeDto[];
}) {
  return (
    <ForceGraphPage {...forceGraphPageProps}>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workSchemaNode}
        dtoList={unassignedRootList}
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
      <ReactFlowWrapper edgeAnimationContext={EdgeAnimation}>
        <WorkSchemaNodeLayoutFlowWithForces></WorkSchemaNodeLayoutFlowWithForces>
      </ReactFlowWrapper>
    </ForceGraphPage>
  );
}

const EdgeAnimation: EdgeAnimationContextType = {
  direction: 'to-source'
};
