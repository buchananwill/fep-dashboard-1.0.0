'use server';
import { BASE_URL } from '@/api/BASE_URL';
import { toKebabCase } from '@/functions/toKebabCase';
import {
  deleteDtoList,
  deleteOneEntity,
  getAll,
  getDto,
  getDtoListByBodyList,
  getDtoPage,
  postDto,
  postDtoList,
  putDto,
  putDtoList
} from '@/api/v3/operations';
import {
  ApiOperationKey,
  ClientApiParams,
  OperationKeyReturn
} from '@/api/v3/operation-types';
import { DtoDefinition } from '@/api/v3/dtoDefinition';

type ParamsWithUrl<
  Key extends keyof DtoDefinition,
  OperationKey extends ApiOperationKey<Dto>,
  Dto extends DtoDefinition[Key] = DtoDefinition[Key],
  Params extends
    ClientApiParams<Dto>[OperationKey] = ClientApiParams<Dto>[OperationKey]
> = Params & { url: string };

export async function api<
  Key extends keyof DtoDefinition,
  OperationKey extends ApiOperationKey<Dto>,
  Params extends ClientApiParams<Dto>[OperationKey],
  Dto extends DtoDefinition[Key] = DtoDefinition[Key]
>(
  dtoDefinition: Key,
  operationKey: OperationKey,
  params: Params
): Promise<OperationKeyReturn<Dto, OperationKey>> {
  const url = `${BASE_URL}/api/v3/${toKebabCase(dtoDefinition)}`;
  const mergedParams = { ...params, url };

  switch (operationKey) {
    case 'postDto': {
      return postDto(mergedParams as ParamsWithUrl<Key, 'postDto'>);
    }
    case 'postDtoList': {
      return postDtoList(mergedParams as ParamsWithUrl<Key, 'postDtoList'>);
    }

    case 'getDtoListByBodyList': {
      return getDtoListByBodyList(
        mergedParams as ParamsWithUrl<Key, 'getDtoListByBodyList'>
      );
    }
    case 'getDto': {
      return getDto<Dto, Dto['id']>(
        mergedParams as ParamsWithUrl<Key, 'getDto'>
      );
    }
    case 'getAll': {
      return getAll<Dto>(mergedParams);
    }
    case 'getDtoPage': {
      return getDtoPage(mergedParams as ParamsWithUrl<Key, 'getDtoPage'>);
    }
    case 'putDto': {
      return putDto(mergedParams as ParamsWithUrl<Key, 'putDto'>);
    }
    case 'putDtoList': {
      return putDtoList(mergedParams as ParamsWithUrl<Key, 'putDtoList'>);
    }
    case 'deleteOneEntity': {
      return deleteOneEntity(
        mergedParams as ParamsWithUrl<Key, 'deleteOneEntity'>
      );
    }
    case 'deleteDtoList': {
      return deleteDtoList(mergedParams as ParamsWithUrl<Key, 'deleteDtoList'>);
    }
    default: {
      throw Error(`Unsupported operation: ${operationKey}`);
    }
  }
}
