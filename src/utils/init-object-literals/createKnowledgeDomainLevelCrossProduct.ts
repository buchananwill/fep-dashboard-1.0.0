import { WorkTaskTypeDto } from '@/api/zod-schemas/WorkTaskTypeDtoSchema';

function createKnowledgeDomainLevelCrossProduct(
  domainNames: string[],
  levels: number[]
): Partial<WorkTaskTypeDto>[] {
  return domainNames.flatMap((knowledgeDomainName) =>
    levels.map((knowledgeLevelLevelOrdinal) => ({
      knowledgeDomainName,
      knowledgeLevelLevelOrdinal
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
