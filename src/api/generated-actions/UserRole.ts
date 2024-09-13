'use server';
import { UserRoleDto } from '@/api/generated-types/generated-types';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateWithTypeEndpointSet } from '../actions/template-type-endpoints';

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
  UserRoleDto,
  number
>(
  '/api/v2/userRoles'
);


const {
getByTypeIdList  } = generateWithTypeEndpointSet<UserRoleDto>(
  '/api/v2/userRoles'
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
, getByTypeIdList
}

