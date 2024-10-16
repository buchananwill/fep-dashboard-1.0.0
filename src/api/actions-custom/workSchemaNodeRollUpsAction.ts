'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkSchemaNodeRootTotalDeliveryAllocationRollupDto } from '@/api/generated-types/generated-types';

export async function getWorkSchemaNodeRollUps() {
  return getWithoutBody<WorkSchemaNodeRootTotalDeliveryAllocationRollupDto[]>(
    constructUrl(['/api/v2', 'workSchemaNodes', 'rootRodesWithRollUps'])
  );
}
