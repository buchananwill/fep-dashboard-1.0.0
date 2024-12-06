import { RepeatPostRequest } from '@/api/types';
import { ProviderRolePostRequest } from '@/api/old-zod-schemas/ProviderRolePostRequestSchema_';
import { ProviderRoleTypeDto } from '@/api/generated-types/generated-types_';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';
import { getTemplateMergingFunction } from '@/utils/init-object-literals/getTemplateMergingFunction';
import { createWholeSchoolPartials } from '@/utils/init-object-literals/createKnowledgeDomainLevelCrossProduct';
import { createRequestRecordCombiner } from '@/utils/init-object-literals/createRequestRecordCombiner';
import {
  classicsDepartmentPartials,
  dramaWholeSchoolPartials,
  economicsAlevelPartials,
  englishWholeSchoolPartials,
  govAndPolALevelPartials,
  mathsFurtherWttExamples,
  mathsLowerSchoolWttExamples,
  peWholeSchoolPartials,
  philosophyALevelPartials,
  rsWholeSchoolPartials,
  singleAlevelMaths
} from '@/utils/init-object-literals/wttPartials';
import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';

const roleTypeExample: Partial<ProviderRoleTypeDto> = {
  name: 'Teacher'
};

const templateRequest: ProviderRolePostRequest = {
  roleTypeExample: roleTypeExample,
  rating: 1,
  workTaskTypeExampleList: []
};

const templateRepeatRequest: RepeatPostRequest<ProviderRolePostRequest> = {
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

const classics: RequestCreationParams[] = [
  ['Classics Department', 3, classicsDepartmentPartials]
];

const englishAndDrama: RequestCreationParams[] = [
  ['English', 8, englishWholeSchoolPartials],
  ['Drama', 5, dramaWholeSchoolPartials]
];

const economicsGp: RequestCreationParams[] = [
  ['Economics', 3, economicsAlevelPartials],
  ['GP', 2, govAndPolALevelPartials]
];

const peAndGames: RequestCreationParams[] = [
  ['PE Department', 3, peWholeSchoolPartials]
];

const rsAndPhilosophy: RequestCreationParams[] = [
  ['RS', 5, rsWholeSchoolPartials],
  ['Philosophy', 2, philosophyALevelPartials]
];

const maths: RequestCreationParams[] = [
  ['Maths', 15, [...mathsLowerSchoolWttExamples, ...singleAlevelMaths]],
  ['Further Maths', 5, mathsFurtherWttExamples]
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
  .map((record) => providerMergingFunction(record));

export const pipelineAsJson = JSON.stringify(bulkPipeline);
