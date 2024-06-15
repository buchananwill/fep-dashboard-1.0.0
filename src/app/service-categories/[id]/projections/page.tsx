import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkSeriesBundleItemDto } from '@/api/dtos/WorkSeriesBundleItemDtoSchema';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { DeliveryAllocationDto } from '@/api/dtos/DeliveryAllocationDtoSchema';
import { WorkTaskTypeApi } from '@/api/clientApi';
import { isNotUndefined } from '@/api/main';
import _ from 'lodash';

const projectionUrl = constructUrl(
  '/api/v2/workProjectSeriesSchemas/workProjectSeriesProjections'
);

export default async function page() {
  const projectionData: WorkProjectSeriesProjection[] =
    await getWithoutBody(projectionUrl);
  const allocationProjectionMap = new Map<
    number,
    DeliveryAllocationProjection[]
  >();
  const flatMap: DeliveryAllocationProjection[] = projectionData.flatMap(
    ({
      workProjectSeriesSchema: { deliveryAllocations, workProjectBandwidth },
      multiplier
    }) => {
      return deliveryAllocations.map((devAl) => ({
        ...devAl,
        horizontalMultiplier: multiplier,
        verticalMultiplier: workProjectBandwidth
      }));
    }
  );
  flatMap.forEach((devAl) => {
    let devAlProjList = allocationProjectionMap.get(devAl.workTaskTypeId);
    if (devAlProjList === undefined) {
      devAlProjList = [];
      allocationProjectionMap.set(devAl.workTaskTypeId, devAlProjList);
    }
    devAlProjList.push(devAl);
  });
  const workTaskTypeDtos = await WorkTaskTypeApi.getDtoListByBodyList([
    ...allocationProjectionMap.keys()
  ]);

  const groupBy = _.groupBy(workTaskTypeDtos, (wtt) => wtt.knowledgeDomainName);

  const knowledgeDomainNameAndTotalList = Object.entries(groupBy)
    .map(([knowledgeDomainName, dtoArray]) => {
      const allTotal =
        dtoArray
          ?.map((dto) => allocationProjectionMap.get(dto.id))
          .filter(isNotUndefined)
          .map((devAlList) => flattenDevAlListToSum(devAlList))
          .reduce((prev, curr) => prev + curr, 0) ?? 0;
      return [knowledgeDomainName, allTotal];
    })
    .map((tuple) => [...tuple, (tuple[1] as number) / 58]);

  return (
    <ul>
      {knowledgeDomainNameAndTotalList.map(
        ([knowledgeLevelName, total, minStack]) => (
          <li key={knowledgeLevelName}>
            {knowledgeLevelName} : {total} : min stack:{' '}
            {Math.ceil(minStack as number)}
          </li>
        )
      )}
      <li>
        TOTAL:{' '}
        {knowledgeDomainNameAndTotalList.reduce(
          (prev, [, sumNext]) => prev + (sumNext as number),
          0
        )}
      </li>
    </ul>
  );
}

interface WorkProjectSeriesProjection {
  workProjectSeriesSchema: WorkProjectSeriesSchemaDto;
  bundleItemDtoList: WorkSeriesBundleItemDto[];
  bundleItemAssignmentList: Record<number, number[]>;
  carouselOptionDtoMap: CarouselOptionDto[];
  carouselOrderItemAssigneeMap: Record<number, number[]>;
  multiplier: number;
}

type DeliveryAllocationProjection = DeliveryAllocationDto & {
  horizontalMultiplier: number;
  verticalMultiplier: number;
};

function flattenDevAlListToSum(
  deliveryAllocationProjection: DeliveryAllocationProjection[]
) {
  return deliveryAllocationProjection
    .map(
      ({
        horizontalMultiplier,
        count,
        deliveryAllocationSize,
        verticalMultiplier
      }) =>
        horizontalMultiplier *
        count *
        deliveryAllocationSize *
        verticalMultiplier
    )
    .reduce((prev, curr) => prev + curr, 0);
}
