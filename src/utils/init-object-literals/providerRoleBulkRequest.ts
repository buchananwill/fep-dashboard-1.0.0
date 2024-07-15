import { RepeatPostRequest, TemplateRequestOverrides } from '@/api/types';
import { ProviderRolePostRequest } from '@/api/dtos/ProviderRolePostRequestSchema_';
import { ProviderRoleTypeDto } from '@/api/dtos/ProviderRoleTypeDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { getTemplateMergingFunction } from '@/utils/init-object-literals/getTemplateMergingFunction';
import {
  createALevelPartials,
  createWholeSchoolPartials
} from '@/utils/init-object-literals/createKnowledgeDomainLevelCrossProduct';
import { createRequestRecordCombiner } from '@/utils/init-object-literals/createRequestRecordCombiner';

type ProviderRoleOverrides = TemplateRequestOverrides<ProviderRolePostRequest>;

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

const providerMergingFunction = getTemplateMergingFunction(
  templateRepeatRequest
);

const globalSuitability = createWholeSchoolPartials([
  'Form Period',
  'Registration',
  'Private Study',
  'Learning Development'
]);

export type RequestCreationParams = [
  string,
  number,
  Partial<WorkTaskTypeDto>[]
];

const createRequestRecord = createRequestRecordCombiner(globalSuitability);

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
  ['Classics Department', 3, classicsDepartmentPartials]
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
  [
    'Maths',
    15,
    [
      { name: 'Maths: 7' },
      { name: 'Maths: 8' },
      { name: 'Maths: 9' },
      { name: 'Maths: 10' },
      { name: 'Maths: 11' },
      { name: 'Maths: 12' },
      { name: 'Maths: 13' }
    ]
  ],
  [
    'Further Maths',
    5,
    [
      { name: 'Further Maths 1: 12' },
      { name: 'Further Maths 2: 12' },
      { name: 'Further Maths 1: 13' },
      { name: 'Further Maths 2: 13' }
    ]
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
  .map((record) => providerMergingFunction(record));

export const pipelineAsJson = JSON.stringify(bulkPipeline);
