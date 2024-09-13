import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { DeliveryAllocationDto } from '@/api/generated-types/generated-types';
import { KnowledgeDomainDto } from '@/api/zod-schemas/KnowledgeDomainDtoSchema';

const projectionUrl = constructUrl(
  '/api/v2/workProjectSeriesSchemas/knowledgeDomainWorkProjections'
);

export default async function page() {
  const projectionData: KnowledgeDomainWorkProjection[] =
    await getWithoutBody(projectionUrl);
  const allocationProjectionMap = new Map<
    number,
    DeliveryAllocationProjection[]
  >();

  return (
    <ul>
      {projectionData.map(
        ({ knowledgeDomainDto: { name, id }, totalWork, minimumBandwidth }) => (
          <li key={id}>
            {name} : {totalWork} : min stack:{' '}
            {Math.ceil(minimumBandwidth as number)}
          </li>
        )
      )}
      <li>
        TOTAL:{' '}
        {projectionData.reduce((prev, { totalWork }) => prev + totalWork, 0)}
      </li>
    </ul>
  );
}

interface DeliveryAllocationProjection {
  deliveryAllocation: DeliveryAllocationDto;
  horizontalMultiplier: number;
  verticalMultiplier: number;
}
interface KnowledgeDomainWorkProjection {
  knowledgeDomainDto: KnowledgeDomainDto;
  totalWork: number;
  minimumBandwidth: number;
}
