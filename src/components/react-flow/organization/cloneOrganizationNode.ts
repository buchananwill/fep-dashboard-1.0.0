import { DataNode, incrementCloneSuffix } from 'react-d3-force-wrapper';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';

import { TransientIdOffset } from '@/api/literals';

export function cloneOrganizationNode(
  templateNode: DataNode<OrganizationDto>
): DataNode<OrganizationDto> {
  const {
    data: { name }
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);
  const clonedNode = structuredClone(templateNode);
  const {
    data: { workSchemaNodeAssignment }
  } = clonedNode;
  workSchemaNodeAssignment.id = TransientIdOffset + templateNode.data.id;

  return {
    ...clonedNode,
    data: {
      ...clonedNode.data,
      name: cloneName
    }
  };
}
