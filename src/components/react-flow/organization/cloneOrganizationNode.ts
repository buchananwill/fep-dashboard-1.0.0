import { incrementCloneSuffix } from 'react-d3-force-wrapper';
import { OrganizationDto } from '@/api/zod-schemas/OrganizationDtoSchema_';

import { ABSOLUTE_SMALLEST_TRANSIENT_ID } from '@/api/literals';
import { FlowNode } from '@/react-flow/types';
import { makeTransientId } from '@/makeTransientId';

export function cloneOrganizationNode(
  templateNode: FlowNode<OrganizationDto>
): FlowNode<OrganizationDto> {
  const {
    data: { name }
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);
  const clonedNode = structuredClone(templateNode);
  const {
    data: { workSchemaNodeAssignment }
  } = clonedNode;
  workSchemaNodeAssignment!.id = makeTransientId(ABSOLUTE_SMALLEST_TRANSIENT_ID + templateNode.data.id);

  return {
    ...clonedNode,
    data: {
      ...clonedNode.data,
      name: cloneName
    }
  };
}
