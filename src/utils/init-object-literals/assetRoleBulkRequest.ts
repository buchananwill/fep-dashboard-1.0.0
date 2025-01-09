import { RepeatPostRequest } from '@/api/types';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { getTemplateMergingFunction } from '@/utils/init-object-literals/getTemplateMergingFunction';
import { createWholeSchoolPartials } from '@/utils/init-object-literals/createKnowledgeDomainLevelCrossProduct';
import { createRequestRecordCombiner } from '@/utils/init-object-literals/createRequestRecordCombiner';
import {
  artALevel,
  artLowerSchool,
  classicsDepartmentPartials,
  dramaWholeSchoolPartials,
  economicsAlevelPartials,
  englishWholeSchoolPartials,
  govAndPolALevelPartials,
  mathsFurtherWttExamples,
  mathsLowerSchoolWttExamples,
  musicALevel,
  musicLowerSchool,
  philosophyALevelPartials,
  rsWholeSchoolPartials,
  singleAlevelMaths
} from '@/utils/init-object-literals/wttPartials';
import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';
import { AssetRoleTypeDto } from '@/api/generated-types/generated-types_';
import { PartialDeep } from 'type-fest';
import { AssetRolePostRequest } from '@/api/old-zod-schemas/AssetRolePostRequestSchema_';

const assetRoleTypeExample: Partial<AssetRoleTypeDto> = {
  name: 'Class Room'
};

const templateRequest: AssetRolePostRequest = {
  roleTypeExample: assetRoleTypeExample,
  rating: 1,
  workTypeExampleList: []
};

const templateRepeatRequest: RepeatPostRequest<AssetRolePostRequest> = {
  postRequest: templateRequest,
  count: 0
};

const providerMergingFunction = getTemplateMergingFunction(
  templateRepeatRequest
);

const globalSuitability = createWholeSchoolPartials([
  'Form Period',
  'Registration',
  'Private Study',
  'Learning Development'
]);

const createRequestRecord = createRequestRecordCombiner(globalSuitability);

const standardDepartments: Record<string, number> = {
  Biology: 5,
  Chemistry: 5,
  Computing: 3,
  'Design and T': 3,
  French: 2,
  German: 2,
  Geography: 5,
  History: 5,
  Physics: 5
};

// Request Creation Param Lists

const standardDepartmentParams: RequestCreationParams[][] = Object.entries(
  standardDepartments
).map(([subject, count]) => {
  return [
    [`${subject} Department`, count, createWholeSchoolPartials([subject])]
  ] as [string, number, PartialDeep<WorkTypeDto>[]][];
});

const languagesShared: RequestCreationParams[] = [
  ['Languages Shared', 1, createWholeSchoolPartials(['French', 'German'])]
];

const classics: RequestCreationParams[] = [
  ['Classics Department', 2, classicsDepartmentPartials]
];

const music: RequestCreationParams[] = [
  ['Music Department', 2, musicLowerSchool],
  ['Music Department A Level', 3, musicALevel]
];
const art: RequestCreationParams[] = [
  ['Art Department', 2, artLowerSchool],
  ['Art Department A Level', 3, artALevel]
];

const englishAndDrama: RequestCreationParams[] = [
  ['English', 5, englishWholeSchoolPartials],
  ['Drama', 5, dramaWholeSchoolPartials]
];

const economicsGp: RequestCreationParams[] = [
  ['Economics', 3, economicsAlevelPartials],
  ['GP', 2, govAndPolALevelPartials]
];

const pe: RequestCreationParams[] = [
  ['PE Department', 3, createWholeSchoolPartials(['PE', 'PE as an Option'])]
];
const games: RequestCreationParams[] = [
  ['Games Department', 8, createWholeSchoolPartials(['Games'])]
];

const rsAndPhilosophy: RequestCreationParams[] = [
  ['RS', 3, [...rsWholeSchoolPartials, ...philosophyALevelPartials]]
];

const maths: RequestCreationParams[] = [
  [
    'Maths',
    7,
    [
      ...mathsLowerSchoolWttExamples,
      ...singleAlevelMaths,
      ...mathsFurtherWttExamples
    ]
  ]
];

const overspillRooms: RequestCreationParams[] = [
  [
    'Overspill',
    6,
    [
      ...mathsLowerSchoolWttExamples,
      ...singleAlevelMaths,
      ...classicsDepartmentPartials,
      ...rsWholeSchoolPartials,
      ...englishWholeSchoolPartials,
      ...createWholeSchoolPartials(['History', 'Geography', 'German', 'French'])
    ]
  ]
];

// Converting params to requests

const requestParamsListList: RequestCreationParams[][] = [
  englishAndDrama,
  economicsGp,
  pe,
  rsAndPhilosophy,
  classics,
  maths,
  music,
  art,
  languagesShared,
  games,
  overspillRooms,
  ...standardDepartmentParams
];

export function flattenParamList(list: RequestCreationParams[]) {
  return list.reduce(
    (acc, params) => ({ ...acc, ...createRequestRecord(params) }),
    {}
  );
}

export const bulkPipeline = requestParamsListList
  .map(flattenParamList)
  .map((record) => providerMergingFunction(record));

export const pipelineAsJson = JSON.stringify(bulkPipeline);
