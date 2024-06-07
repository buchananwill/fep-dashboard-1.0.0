import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';
import _ from 'lodash';
import { GraphDto, GraphDtoPutRequestBody } from 'react-d3-force-wrapper';
import { WorkSeriesBundleAssignmentDtoSchema } from '@/api/dtos/WorkSeriesBundleAssignmentDtoSchema';

export function validateAssignmentDtos(
  putUpdatedGraph: (
    // eslint-disable-next-line no-unused-vars
    request: GraphDtoPutRequestBody<OrganizationDto>
  ) => Promise<GraphDto<OrganizationDto>>
) {
  return (request: GraphDtoPutRequestBody<OrganizationDto>) => {
    const { graphDto } = request;
    const { nodes } = graphDto;
    const hasNameDtos = nodes.map((dn) => dn.data);
    const dataWithValidatedAssignments = hasNameDtos.map((org) => {
      const { id, workSeriesBundleAssignment } = org;
      const validatedAssignmentDto = {
        ...workSeriesBundleAssignment,
        organizationId: id
      };
      const parsedAssignment = WorkSeriesBundleAssignmentDtoSchema.parse(
        validatedAssignmentDto
      );
      return {
        ...org,
        workSeriesBundleAssignment: parsedAssignment
      };
    });
    const nodesWithDataAssignmentsValidated = nodes.map((dn, index) => {
      const replacementData = dataWithValidatedAssignments[index];
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
    console.log(safeGraph);
    const safeRequest = { ...request, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}
