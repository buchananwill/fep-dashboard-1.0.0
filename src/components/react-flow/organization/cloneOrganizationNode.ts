import { DataNode, incrementCloneSuffix } from 'react-d3-force-graph';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';

export function cloneOrganizationNode(
  templateNode: DataNode<OrganizationDto>
): DataNode<OrganizationDto> {
  const {
    data: { name }
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);

  return {
    ...templateNode,
    data: {
      ...templateNode.data,
      name: cloneName,
      workSeriesBundleAssignmentId: NaN
    }
  };
}
