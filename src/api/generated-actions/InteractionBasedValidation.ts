'use server';

import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { InteractionBasedValidationDto } from '@/api/dtos/InteractionBasedValidationDtoSchema';

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
} = generateBaseEndpointSet<InteractionBasedValidationDto, number>(
  '/api/v2/interactionBasedValidation'
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
