import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { DataNode, reMapNodeIdWithoutValidating } from 'react-d3-force-wrapper';
import { OrganizationDatNodeDtoSchema } from '@/components/react-flow/organization/organizationCallbacks';

export function revalidateOrganizationNode(node: DataNode<OrganizationDto>) {
  const remappedNode = reMapNodeIdWithoutValidating(node);
  try {
    return OrganizationDatNodeDtoSchema.parse(remappedNode);
  } catch (error) {
    console.error(error, remappedNode);
  }
}
