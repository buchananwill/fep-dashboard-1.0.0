'use client';
import { cloneOrganizationNode } from './cloneOrganizationNode';
import { getGraphUpdaterWithNameDeDuplication } from './getGraphUpdaterWithNameDeDuplication';
import { putGraph } from '@/api/generated-actions/Organization';
import { GraphDto, GraphDtoPutRequestBody } from 'react-d3-force-graph';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import _ from 'lodash';

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };

export const organizationGraphUpdater = validateAssignmentDtos(
  getGraphUpdaterWithNameDeDuplication(putGraph)
);

function validateAssignmentDtos(
  putUpdatedGraph: (
    // eslint-disable-next-line no-unused-vars
    request: GraphDtoPutRequestBody<OrganizationDto>
  ) => Promise<GraphDto<OrganizationDto>>
) {
  return (request: GraphDtoPutRequestBody<OrganizationDto>) => {
    const { graphDto } = request;
    const { nodes } = graphDto;
    const hasNameDtos = nodes.map((dn) => dn.data);
    const validatedBundleAssignments = hasNameDtos.map((org) => {
      const { id, workSeriesBundleAssignment } = org;
      return {
        ...org,
        workSeriesBundleAssignment: {
          ...workSeriesBundleAssignment,
          organizationId: id
        }
      };
    });
    const nodesWithDataAssignmentsValidated = nodes.map((dn, index) => {
      const replacementData = validatedBundleAssignments[index];
      if (replacementData.id !== dn.id)
        throw Error('Arrays not aligned. Could not clone nodes.');
      const cloneDeep = _.cloneDeep(dn);
      cloneDeep.data = replacementData;
      return cloneDeep;
    });
    const safeGraph: GraphDto<OrganizationDto> = {
      ...graphDto,
      nodes: nodesWithDataAssignmentsValidated
    };
    const safeRequest = { ...request, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}
