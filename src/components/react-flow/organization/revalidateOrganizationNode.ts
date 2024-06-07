import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import { DataNode, reMapNodeIdWithoutValidating } from 'react-d3-force-wrapper';
import { OrganizationDatNodeDtoSchema } from '@/components/react-flow/organization/organizationCallbacks';

export function revalidateOrganizationNode(node: DataNode<OrganizationDto>) {
  console.log(node);
  const remappedNode = reMapNodeIdWithoutValidating(node);
  try {
    const parsed = OrganizationDatNodeDtoSchema.parse(remappedNode);
    console.log(parsed);
    return parsed;
  } catch (error) {
    console.error(error, remappedNode);
  }
}
