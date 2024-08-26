import { PartialDeep } from 'type-fest';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

function createKnowledgeDomainLevelCrossProduct(
  domainNames: string[],
  levels: number[]
): PartialDeep<WorkTaskTypeDto>[] {
  return domainNames.flatMap((knowledgeDomainName) =>
    levels.map((knowledgeLevelLevelOrdinal) => ({
      knowledgeDomain: { name: knowledgeDomainName },
      knowledgeLevel: { levelOrdinal: knowledgeLevelLevelOrdinal }
    }))
  );
}

export function createALevelPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(domainNames, [12, 13]);
}

export function createLowerSchoolPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(domainNames, [7, 8, 9, 10, 11]);
}
export function createWholeSchoolPartials(domainNames: string[]) {
  return [
    ...createLowerSchoolPartials(domainNames),
    ...createALevelPartials(domainNames)
  ];
}

export function createCsvpaPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(domainNames, [0, 1, 2, 3]);
}
