import {
  GraphDto,
  GraphDtoPutRequestBody,
  incrementCloneSuffix,
  reMapNodeIdWithoutValidating
} from 'react-d3-force-wrapper';
import {
  WorkSchemaNodeDto,
  WorkSchemaNodeDtoSchema
} from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import { createDataNodeDtoSchema } from '@/api/zod-mods';
import {
  Middleware,
  middlewareCombiner
} from '@/react-flow/utils/graphMiddlewareCombiner';
import { Api } from '@/api/clientApi_';
import { isNotUndefined } from '@/api/main';
import { z } from 'zod';
import { ServerAction } from '@/react-flow/hooks/useEditableFlow';
import { WorkSchemaNodeType } from '@/components/react-flow/work-schema-node/workSchemaNodeTypesUi';
import { FlowNode } from '@/react-flow/types';
import { CarouselDto } from '@/api/zod-schemas/CarouselDtoSchema';
import { getGraphUpdaterWithNameDeDuplication } from '@/components/react-flow/organization/getGraphUpdaterWithNameDeDuplication';

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

export function validateHierarchy(
  parent: WorkSchemaNodeDto | undefined,
  child: WorkSchemaNodeDto | undefined,
  getCarousel: (id: string) => CarouselDto | undefined
): boolean {
  if (!parent || !child) return false;
  const childResolutionMode = child.resolutionMode;
  const typeValidation =
    determinePermittedChildTypes(parent).includes(childResolutionMode);
  if (!typeValidation) return false;

  // Explicit CarouselGroup and Carousel entities are only allowed to attach to their own explicit children.
  const carouselGroupId = parent.carouselGroupId;
  if (carouselGroupId !== undefined) {
    const carousel = child.carouselId
      ? getCarousel(child.carouselId)
      : undefined;
    return (
      carousel !== undefined && carousel.carouselGroupId === carouselGroupId
    );
  }

  const carousel = parent.carouselId
    ? getCarousel(parent.carouselId)
    : undefined;
  if (carousel !== undefined) {
    const carouselOption = child.carouselOptionId;
    return (
      carouselOption !== undefined &&
      carousel.carouselOptionDtos.some((option) => option.id === carouselOption)
    );
  }

  return true;
}

export function determineLocalResolution(
  workSchemaNode: WorkSchemaNodeDto
): WorkSchemaNodeType {
  if (workSchemaNode.workProjectSeriesSchemaId !== undefined) return 'LEAF';
  if (workSchemaNode.carouselOptionId !== undefined) return 'CAROUSEL_OPTION';
  if (
    workSchemaNode.carouselId !== undefined ||
    (workSchemaNode.preferCarousel && !workSchemaNode.allowBundle)
  )
    return 'CAROUSEL';
  if (workSchemaNode.carouselGroupId !== undefined) return 'CAROUSEL_GROUP';
  if (!workSchemaNode.allowBundle) return 'SERIAL';
  return 'OPEN';
}

const maxOneOf: (keyof WorkSchemaNodeDto)[] = [
  'carouselGroupId',
  'carouselId',
  'workProjectSeriesSchemaId'
];

function spyOnRequest<T, U>(currentRequest: ServerAction<T, U>) {
  return (request: T) => {
    return currentRequest(request);
  };
}

export const workSchemaNodeCloneFunctionWrapper = {
  memoizedFunction: cloneWorkSchemaNode
};
export const WorkSchemaNodeDataNodeDtoSchema = createDataNodeDtoSchema(
  WorkSchemaNodeDtoSchema
);
export const workSchemaNodeGraphUpdater = middlewareCombiner<
  GraphDtoPutRequestBody<WorkSchemaNodeDto>,
  Promise<GraphDto<WorkSchemaNodeDto>>
>(
  [
    getGraphUpdaterWithNameDeDuplication as Middleware<
      GraphDtoPutRequestBody<WorkSchemaNodeDto>,
      Promise<GraphDto<WorkSchemaNodeDto>>
    >
  ],
  Api.WorkSchemaNode.putGraph
);

type WorkSchemaNodeDataNodeDto = z.infer<
  typeof WorkSchemaNodeDataNodeDtoSchema
>;

export function validateWorkSchemaNodeDataNodeDto(
  dataNode: FlowNode<WorkSchemaNodeDto>
) {
  const dataNodeDto = reMapNodeIdWithoutValidating(dataNode);
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
  return parsedNode;
}

function determinePermittedChildTypes(
  parent: WorkSchemaNodeDto
): WorkSchemaNodeType[] {
  switch (parent.resolutionMode) {
    case 'CAROUSEL_OPTION':
      return [];
    case 'LEAF':
      return [];
    case 'CAROUSEL':
      return ['LEAF', 'CAROUSEL_GROUP', 'CAROUSEL_OPTION', 'SERIAL', 'OPEN'];
    case 'CAROUSEL_GROUP':
      return ['CAROUSEL'];
    default:
      return [
        'CAROUSEL',
        'CAROUSEL_OPTION',
        'CAROUSEL_GROUP',
        'OPEN',
        'SERIAL',
        'LEAF'
      ];
  }
}
