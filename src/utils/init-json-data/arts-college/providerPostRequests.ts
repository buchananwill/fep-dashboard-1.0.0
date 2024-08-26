import { createCsvpaPartials } from '@/utils/init-object-literals/createKnowledgeDomainLevelCrossProduct';
import { flattenParamList } from '@/utils/init-object-literals/assetRoleBulkRequest';
import { RequestCreationParams } from '@/utils/init-object-literals/requestCreationParams';
import { AssetRoleTypeDto } from '@/api/zod-schemas/AssetRoleTypeDtoSchema';
import { AssetRolePostRequest } from '@/api/zod-schemas/AssetRolePostRequestSchema_';
import { RepeatPostRequest } from '@/api/types';
import { getTemplateMergingFunction } from '@/utils/init-object-literals/getTemplateMergingFunction';
import { ProviderRoleTypeDto } from '@/api/zod-schemas/ProviderRoleTypeDtoSchema';
import { ProviderRolePostRequest } from '@/api/zod-schemas/ProviderRolePostRequestSchema';
import { PartialDeep } from 'type-fest';

const classicalVoice = createCsvpaPartials(['Classical Voice']);
const popVoice = createCsvpaPartials(['Jazz/Pop Voice']);
const doubleBass = createCsvpaPartials(['Double Bass']);
const pianoPop = createCsvpaPartials(['Pop Piano', 'Piano']);
const pianoClassical = createCsvpaPartials(['Classical Piano', 'Piano']);
const guitar = createCsvpaPartials(['Guitar', 'Pop Guitar']);
const dj = createCsvpaPartials(['DJ']);
const production = createCsvpaPartials([
  'Production',
  'Production: Recording',
  'Production: Sequencing'
]);
const drumKit = createCsvpaPartials(['Drum Kit']);
const frenchHorn = createCsvpaPartials(['French Horn']);

const providerRoleType: Partial<ProviderRoleTypeDto> = {
  name: 'Teacher'
};

const templateRequest: PartialDeep<ProviderRolePostRequest> = {
  roleTypeExample: providerRoleType,
  rating: 4,
  workTaskTypeExampleList: []
};

const templateRepeatRequest: RepeatPostRequest<
  PartialDeep<ProviderRolePostRequest>
> = {
  postRequest: templateRequest,
  count: 1
};

const providerMergingFunction = getTemplateMergingFunction(
  templateRepeatRequest
);

const postRequests = [
  classicalVoice,
  popVoice,
  doubleBass,
  pianoPop,
  pianoClassical,
  guitar,
  dj,
  production,
  drumKit,
  frenchHorn
]
  .map(
    (partialList) =>
      [
        partialList[0].knowledgeDomain?.name,
        1,
        partialList
      ] as RequestCreationParams[]
  )
  .map(flattenParamList)
  .map(providerMergingFunction);
