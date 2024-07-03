import {
  BulkRepeatPostRequest,
  RepeatPostRequest,
  TemplateRequestOverrides
} from '@/api/types';
import { ProviderRolePostRequest } from '@/api/dtos/ProviderRolePostRequestSchema';
import { ProviderRoleTypeDto } from '@/api/dtos/ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { merge } from 'lodash';

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
  const repeatPostRequestMap = Object.fromEntries(
    Object.entries(requestMap).map(([key, value]) => [
      key,
      mapToRepeatPostRequest(value, templateRepeatRequest)
    ])
  );
  return { repeatPostRequestMap };
}

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

function createALevelPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(domainNames, [12, 13]);
}
function createWholeSchoolPartials(domainNames: string[]) {
  return createKnowledgeDomainLevelCrossProduct(
    domainNames,
    [7, 8, 9, 10, 11, 12, 13]
  );
}
const globalSuitability = createWholeSchoolPartials([
  'Form Period',
  'Registration',
  'Private Study',
  'Learning Development'
]);

type RequestCreationParams = [string, number, Partial<WorkTaskTypeDto>[]];

function createRequestRecord([
  name,
  count,
  workTaskTypeExampleList
]: RequestCreationParams) {
  const response: Record<string, TemplateRequestOverrides> = {};
  response[name] = {
    count,
    postRequest: {
      workTaskTypeExampleList: [
        ...workTaskTypeExampleList,
        ...globalSuitability
      ]
    }
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

// Request Creation Param Lists

const standardDepartmentParams: RequestCreationParams[][] = Object.entries(
  standardDepartments
).map(([subject, count]) => {
  return [
    [`${subject} Department`, count, createWholeSchoolPartials([subject])]
  ] as [string, number, Partial<WorkTaskTypeDto>[]][];
});

const classicsDepartmentPartials = [...classCiv, ...latin];

const classics: RequestCreationParams[] = [
  ['Classics Department', 2, classicsDepartmentPartials]
];

const englishAndDrama: RequestCreationParams[] = [
  ['English', 8, createWholeSchoolPartials(['English'])],
  ['Drama', 5, createWholeSchoolPartials(['Drama'])]
];

const economicsGp: RequestCreationParams[] = [
  ['Economics', 3, createALevelPartials(['Economics'])],
  ['GP', 2, createALevelPartials(['GP'])]
];

const peAndGames: RequestCreationParams[] = [
  [
    'PE Department',
    3,
    createWholeSchoolPartials(['PE', 'PE as an Option', 'Games'])
  ]
];

const rsAndPhilosophy: RequestCreationParams[] = [
  ['RS', 5, createWholeSchoolPartials(['RS'])],
  ['Philosophy', 2, createALevelPartials(['Philosophy'])]
];

const maths: RequestCreationParams[] = [
  ['Maths', 15, createWholeSchoolPartials(['Maths'])],
  [
    'Further Maths 1',
    5,
    createALevelPartials(['Further Maths 1', 'Further Maths 2'])
  ]
];

// Converting params to requests

const requestParamsListList: RequestCreationParams[][] = [
  englishAndDrama,
  economicsGp,
  peAndGames,
  rsAndPhilosophy,
  classics,
  maths,
  ...standardDepartmentParams
];

export const bulkPipeline = requestParamsListList
  .map((list) =>
    list.reduce(
      (acc, params) => ({ ...acc, ...createRequestRecord(params) }),
      {}
    )
  )
  .map((record) => mapToBulkRepeatRequest(record));

//
// const englishAndDramaBulkRequestParams = englishAndDrama.reduce(
//   (acc, params) => ({ ...acc, ...createRequestRecord(params) }),
//   {}
// );
// const englishAndDramaRequest = mapToBulkRepeatRequest(
//   englishAndDramaBulkRequestParams
// );
//
// const ecoAndGP = economicsGp.reduce(
//   (acc, params) => ({ ...acc, ...createRequestRecord(params) }),
//   {}
// );
//
// const economicsBulkRepeatRequest = mapToBulkRepeatRequest(ecoAndGP);
//
// const classicsBulkRepeatRequest = mapToBulkRepeatRequest(
//   classics.reduce(
//     (acc, params) => ({...acc, ...createRequestRecord(params)}), {})
// )
//
// const mainDepartmentRequests = standardDepartmentParams.map(params => createRequestRecord(params))
//   .map(record => mapToBulkRepeatRequest(record))
//
// const peDepartment = mapToBulkRepeatRequest(peAndGames.reduce((acc, params) => ({...acc, ...createRequestRecord(params)}), {}))
//
// export const bulkRequestList: BulkRepeatPostRequest<ProviderRolePostRequest>[] =
//   [classicsBulkRepeatRequest, englishAndDramaRequest, economicsBulkRepeatRequest, peDepartment, ...mainDepartmentRequests];
