import { Identifier } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { InitialSet } from '@/app/_literals';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

export function findAssigneeIntersection(
  rotationPrimeList: number[],
  readAnyOption: (
    optionID: Identifier
  ) => CarouselOptionStateInterface | undefined
) {
  const assigneesFilteredList = rotationPrimeList
    .map((optionId) => readAnyOption(optionId))
    .filter(isNotUndefined)
    .map((option) => new Set(option.carouselOrderAssignees)); // Convert each list to a set

  if (assigneesFilteredList.length === 0) {
    return InitialSet as Set<string>;
  }

  // Sort sets by their size in ascending order
  assigneesFilteredList.sort((a, b) => a.size - b.size);

  // Start with the first (smallest) set of assignees
  let intersectionSet = assigneesFilteredList[0];

  // Intersect with the remaining sets
  for (let i = 1; i < assigneesFilteredList.length; i++) {
    intersectionSet = new Set(
      [...intersectionSet].filter((assignee) =>
        assigneesFilteredList[i].has(assignee)
      )
    );
  }

  return intersectionSet;
}
