'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { StaticDeliveryAllocationItemDto } from '@/api/generated-types/generated-types';

const {
  getPage,
  getAll,
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
} = generateBaseEndpointSet<StaticDeliveryAllocationItemDto, number>(
  '/api/v2/staticDeliveryAllocationItems'
);

export {
  getPage,
  getAll,
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
};
