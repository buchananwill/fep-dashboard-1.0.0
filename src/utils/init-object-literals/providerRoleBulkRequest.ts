import {
  BulkRepeatPostRequest,
  RepeatPostRequest,
  TemplateRequestOverrides
} from '@/api/types';
import { ProviderRolePostRequest } from '@/api/dtos/ProviderRolePostRequestSchema';
import { ProviderRoleTypeDto } from '@/api/dtos/ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { PartialDeep } from 'type-fest';
import { merge } from 'lodash';
import { f } from '@nextui-org/slider/dist/use-slider-a94a4c83';

const providerRoleTypeExample: Partial<ProviderRoleTypeDto> = {
  name: 'Teacher'
};

const templateRequest: ProviderRolePostRequest = {
  providerRoleTypeExample,
  rating: 4,
  workTaskTypeExampleList: []
};

const templateRepeatRequest: RepeatPostRequest<ProviderRolePostRequest> = {
  postRequest: templateRequest,
  count: 0
};

function mapToRepeatPostRequest(
  overrides: TemplateRequestOverrides,
  template: RepeatPostRequest<ProviderRolePostRequest>
): RepeatPostRequest<ProviderRolePostRequest> {
  const clonedTemplate = structuredClone(template);
  return merge(clonedTemplate, overrides);
}

function mapToBulkRepeatRequest(
  requestMap: Record<string, TemplateRequestOverrides>
): BulkRepeatPostRequest<ProviderRolePostRequest> {
  const repeatPostRequestList = Object.entries(requestMap)
    .map(([key, value]) => {
      const fullRequest = mapToRepeatPostRequest(value, templateRepeatRequest);
      return [key, fullRequest] as [
        string,
        RepeatPostRequest<ProviderRolePostRequest>
      ];
    })
    .reduce(
      (prev, curr) => {
        prev[curr[0] as string] = curr[1];
        return prev;
      },
      {} as Record<string, RepeatPostRequest<ProviderRolePostRequest>>
    );
  return { repeatPostRequestMap: repeatPostRequestList };
}

function createKnowledgeDomainLevelCrossProduct(
  domainNames: string[],
  levels: number[]
): Partial<WorkTaskTypeDto>[] {
  const responseList: Partial<WorkTaskTypeDto>[] = [];
  for (let knowledgeDomainName of domainNames) {
    for (let knowledgeLevelLevelOrdinal of levels) {
      responseList.push({ knowledgeDomainName, knowledgeLevelLevelOrdinal });
    }
  }
  return responseList;
}

function createALevelPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(domainNames, [12, 13]);
}
function createWholeSchoolPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(
    domainNames,
    [7, 8, 9, 10, 11, 12, 13]
  );
}

type RequestCreationParams = [string, number, Partial<WorkTaskTypeDto>[]];

function createRequestRecord([
  name,
  count,
  workTaskTypeExampleList
]: RequestCreationParams) {
  const response: Record<string, TemplateRequestOverrides> = {};
  response[name] = {
    count,
    postRequest: { workTaskTypeExampleList }
  };
  return response;
}

const classCiv = createALevelPartials(['Classical Civ']);
const latin = createWholeSchoolPartials(['Latin']);

const standardDepartments: Record<string, number> = {
  Art: 2,
  Biology: 8,
  Chemistry: 7,
  Computing: 3,
  'Design and T': 4,
  French: 3,
  Geography: 5,
  German: 6,
  History: 5,
  Music: 3,
  Physics: 8
};

const standardDepartmentParams = Object.entries(standardDepartments).map(
  ([subject, count]) => {
    return [
      `${subject} Department`,
      count,
      createWholeSchoolPartials([subject])
    ] as [string, number, Partial<WorkTaskTypeDto>[]];
  }
);

const classicsDepartmentPartials = [...classCiv, ...latin];

const paramsList: RequestCreationParams[] = [
  ['Classics Department', 2, classicsDepartmentPartials],
  ...standardDepartmentParams
];

const englishAndDrama: RequestCreationParams[] = [
  ['English', 8, createWholeSchoolPartials(['English'])],
  ['Drama', 5, createWholeSchoolPartials(['Drama'])]
];

const englishAndDramaBulkRequestParams = englishAndDrama
  .map((params) => createRequestRecord(params))
  .reduce((prev, curr) => ({ ...prev, ...curr }), {});
const englishAndDramaRequest = mapToBulkRepeatRequest(
  englishAndDramaBulkRequestParams
);

const bulkRequestListMain = paramsList
  .map((item) => createRequestRecord(item))
  .map((record) => mapToBulkRepeatRequest(record));

export const bulkRequestList = [...bulkRequestListMain, englishAndDramaRequest];
