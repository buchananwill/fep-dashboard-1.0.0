import { OrganizationDto } from '@/api/generated-types/generated-types';
import _ from 'lodash';
import { GraphDto, GraphDtoPutRequestBody } from 'react-d3-force-wrapper';
import { WorkSchemaNodeAssignmentDtoSchema } from '@/api/generated-schemas/schemas';

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
      const { id, workSchemaNodeAssignment } = org;
      const validatedAssignmentDto = {
        ...workSchemaNodeAssignment,
        organizationId: id
      };
      const parsedAssignment = WorkSchemaNodeAssignmentDtoSchema.parse(
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

    const safeRequest = { ...request, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}
