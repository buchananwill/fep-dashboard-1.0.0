import { constructUrl } from '@/api/actions/template-base-endpoints';
import { getWithoutBody } from '@/api/actions/template-actions';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Chip } from '@nextui-org/chip';

export default async function page() {
  const projectionList: {
    totalTaskVolume: number;
    workTaskTypeDto: WorkTaskTypeDto;
  }[] = await getWithoutBody(
    constructUrl('/api/v2/resourceMetrics/workTaskTypeProjection')
  );
  const grandTotal = projectionList.reduce(
    (prev, curr) => (prev += curr.totalTaskVolume),
    0
  );
  return <Chip size={'lg'}>{grandTotal}</Chip>;
}
