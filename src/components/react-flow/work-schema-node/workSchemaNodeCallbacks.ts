import {
  DataNode,
  DataNodeDto,
  GraphDto,
  GraphDtoPutRequestBody,
  incrementCloneSuffix,
  reMapNodeIdWithoutValidating
} from 'react-d3-force-wrapper';
import {
  WorkSchemaNodeDto,
  WorkSchemaNodeDtoSchema
} from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { createDataNodeDtoSchema } from '@/api/zod-mods';
import {
  Middleware,
  middlewareCombiner
} from '@/react-flow/utils/graphMiddlewareCombiner';
import { getGraphUpdaterWithNameDeDuplication } from '@/components/react-flow/organization/getGraphUpdaterWithNameDeDuplication';
import { Api } from '@/api/clientApi';
import { isNotUndefined } from '@/api/main';
import { z } from 'zod';
import { ServerAction } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeType } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import { FlowNode } from '@/react-flow/types';

function cloneWorkSchemaNode(
  templateNode: FlowNode<WorkSchemaNodeDto>
): FlowNode<WorkSchemaNodeDto> {
  const {
    data: { name }
  } = templateNode;
  let cloneName = name ? incrementCloneSuffix(name) : undefined;
  const clonedNode = structuredClone(templateNode);

  clonedNode.data.workSchemaNodeAssignmentIds = [];
  clonedNode.data.name = cloneName;
  const parentResolutionMode = templateNode.data.resolutionMode;
  clonedNode.data.resolutionMode = getChildResolutionMode(parentResolutionMode);
  referenceProps.forEach((prop) => delete clonedNode.data[prop]);
  clonedNode.type = clonedNode.data.resolutionMode;

  return clonedNode;
}

export function getChildResolutionMode(
  parentResolutionMode: WorkSchemaNodeType
): WorkSchemaNodeType {
  switch (parentResolutionMode) {
    case 'CAROUSEL_GROUP':
      return 'CAROUSEL';
    default:
      return 'OPEN';
  }
}

const referenceProps: (keyof WorkSchemaNodeDto)[] = [
  'carouselId',
  'carouselOptionId',
  'carouselGroupId',
  'workProjectSeriesSchemaId'
];

// const validateWorkSchemaNodes: Middleware<
//   GraphDtoPutRequestBody<WorkSchemaNodeDto>,
//   GraphDto<WorkSchemaNodeDto>
// > = (currentAction) => {
//   return (request) => {
//     const parsedNodes = request.graphDto.nodes
//       .map((node) => validateWorkSchemaNodeDataNodeDto(node))
//       .filter(isNotUndefined);
//     return currentAction({
//       ...request,
//       graphDto: { ...request.graphDto, nodes: parsedNodes }
//     });
//   };
// };

const maxOneOf: (keyof WorkSchemaNodeDto)[] = [
  'carouselGroupId',
  'carouselId',
  'carouselOptionId',
  'workProjectSeriesSchemaId'
];

function spyOnRequest<T, U>(currentRequest: ServerAction<T, U>) {
  return (request: T) => {
    console.log(request);
    return currentRequest(request);
  };
}

export const workSchemaNodeCloneFunctionWrapper = {
  memoizedFunction: cloneWorkSchemaNode
};
export const WorkSchemaNodeDataNodeDtoSchema = createDataNodeDtoSchema(
  WorkSchemaNodeDtoSchema
);
export const workSchemaNodeGraphUpdater = middlewareCombiner(
  [spyOnRequest],
  Api.WorkSchemaNode.putGraph
);

type WorkSchemaNodeDataNodeDto = z.infer<
  typeof WorkSchemaNodeDataNodeDtoSchema
>;

export function validateWorkSchemaNodeDataNodeDto(
  dataNode: DataNode<WorkSchemaNodeDto>
) {
  console.log(dataNode);
  const dataNodeDto = reMapNodeIdWithoutValidating(dataNode);
  console.log(dataNodeDto);
  let parsedNode: WorkSchemaNodeDataNodeDto | undefined = undefined;
  try {
    parsedNode = WorkSchemaNodeDataNodeDtoSchema.parse(dataNodeDto);
  } catch (e) {
    console.warn(e);
  }
  if (parsedNode !== undefined) {
    const definedNode = parsedNode as WorkSchemaNodeDataNodeDto;
    const countReferenceKeys = maxOneOf
      .map((objectKey) => definedNode.data[objectKey])
      .filter(isNotUndefined).length;
    if (countReferenceKeys > 1) {
      throw new Error(
        'WorkSchemaNode must maximum one referenced resolution pathway.'
      );
    }
  }
  console.log(parsedNode);
  return parsedNode;
}
