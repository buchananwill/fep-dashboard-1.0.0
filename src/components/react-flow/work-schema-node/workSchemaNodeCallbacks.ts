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

function cloneWorkSchemaNode(
  templateNode: DataNode<WorkSchemaNodeDto>
): DataNode<WorkSchemaNodeDto> {
  const {
    data: { name }
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);
  const clonedNode = structuredClone(templateNode);
  clonedNode.data.workSchemaNodeAssignmentIds = [];
  clonedNode.data.name = cloneName;
  return clonedNode;
}

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
  [spyOnRequest, getGraphUpdaterWithNameDeDuplication],
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
