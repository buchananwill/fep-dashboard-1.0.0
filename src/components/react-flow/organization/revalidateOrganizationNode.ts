import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import {
  DataNode,
  DataNodeDto,
  reMapNodeIdWithoutValidating
} from 'react-d3-force-wrapper';
import { OrganizationDataNodeDtoSchema } from '@/components/react-flow/organization/organizationCallbacks';

export function revalidateOrganizationNode(
  node: DataNode<OrganizationDto>
): DataNodeDto<OrganizationDto> | undefined {
  const remappedNode = reMapNodeIdWithoutValidating(node);
  try {
    return OrganizationDataNodeDtoSchema.parse(remappedNode);
  } catch (error) {
    console.error(error, remappedNode);
  }
  return undefined;
}
