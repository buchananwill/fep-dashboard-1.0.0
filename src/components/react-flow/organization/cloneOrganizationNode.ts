import { incrementCloneSuffix } from 'react-d3-force-wrapper';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema_';

import { TransientIdOffset } from '@/api/literals';
import { FlowNode } from '@/react-flow/types';

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
  workSchemaNodeAssignment!.id = TransientIdOffset + templateNode.data.id;

  return {
    ...clonedNode,
    data: {
      ...clonedNode.data,
      name: cloneName
    }
  };
}
