'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { InteractionBasedValidationDto } from '@/api/generated-types/generated-types';

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
} = generateBaseEndpointSet<InteractionBasedValidationDto, number>(
  '/api/v2/interactionBasedValidation'
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
};
