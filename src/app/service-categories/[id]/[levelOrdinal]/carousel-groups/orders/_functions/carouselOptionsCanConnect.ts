/** Two Carousel options can connect if:
 *  1. They are on different Carousels.
 *  2. They are both primed.
 *  3. They have different WorkProjectSeriesSchema IDs.
 *  4. The second Option's Carousel has an Option which matches the WorkProjectSeriesSchema of the first Option.
 *
 *  Therefore, the following extrinsic data is needed:
 *   1. Read any Carousel.
 *   2. Read prime status of any Option
 * */
import { SelectiveContextReadAll } from 'selective-context/dist/types';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';
import {
  buildCompleteCycle,
  DirectedEdgePredicate
} from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/buildCompleteCycle';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

export function getOptionConnectionValidator(
  readAnyCarousel: SelectiveContextReadAll<CarouselDto>
) {
  return (
    optionA: CarouselOptionStateInterface,
    optionB: CarouselOptionStateInterface
  ) => {
    if (optionA.workProjectSeriesSchemaId === optionB.workProjectSeriesSchemaId)
      return false;
    if (optionA.carouselId === optionB.carouselId) return false;
    const carouselB = readAnyCarousel(optionB.carouselId);
    if (carouselB === undefined)
      throw Error(`Could not find expected Carousel for option ${optionB}`);
    return carouselB.carouselOptionDtos.some(
      (option) =>
        option.workProjectSeriesSchemaId === optionA.workProjectSeriesSchemaId
    );
  };
}

export function findHamiltonianCycle(
  optionList: CarouselOptionStateInterface[],
  readAnyCarousel: SelectiveContextReadAll<CarouselDto>
) {
  const optionConnectionValidator =
    getOptionConnectionValidator(readAnyCarousel);
  return buildCompleteCycle(optionList, optionConnectionValidator, new Set());
}

export function validateHamiltonianCycle<T>(
  proposedCycle: T[],
  connectionTest: DirectedEdgePredicate<T>
) {
  let cycle = true;
  for (let i = 0; i < proposedCycle.length; i++) {
    cycle =
      cycle &&
      connectionTest(
        proposedCycle[i],
        proposedCycle[(i + 1) % proposedCycle.length]
      );
    if (!cycle) return false;
  }
  return cycle;
}
