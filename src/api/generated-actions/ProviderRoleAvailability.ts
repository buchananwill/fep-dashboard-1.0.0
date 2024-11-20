'use server';
import { ProviderRoleAvailabilityDto } from '@/api/generated-types/generated-types';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '../actions/template-intersection-endpoints';

const {
getPage,
getAll,
getIdList,
deleteIdList,
postList,
putList,
getOne,
postOne,
putOne,
deleteOne,
getDtoListByBodyList,
getDtoListByParamList,
getDtoListByExampleList
} = generateBaseEndpointSet<
  ProviderRoleAvailabilityDto,
  number
>(
  '/api/v3/provider-role-availability'
);


const {
          getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable
} = generateIntersectionEndpointSet<
  ProviderRoleAvailabilityDto,
  number,
  number
>(
  '/api/v2/providerRoles/availabilities'
);

export {
    getPage,
getAll,
getIdList,
deleteIdList,
postList,
putList,
getOne,
postOne,
putOne,
deleteOne,
getDtoListByBodyList,
getDtoListByParamList,
getDtoListByExampleList
,           getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable

}

