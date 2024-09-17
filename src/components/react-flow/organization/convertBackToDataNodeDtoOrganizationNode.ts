import { OrganizationDto } from '@/api/generated-types/generated-types';
import {
  DataNode,
  DataNodeDto,
  reMapNodeIdWithoutValidating
} from 'react-d3-force-wrapper';
import { OrganizationDataNodeDtoSchema } from '@/components/react-flow/organization/organizationCallbacks';

export function convertBackToDataNodeDtoOrganizationNode(
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
