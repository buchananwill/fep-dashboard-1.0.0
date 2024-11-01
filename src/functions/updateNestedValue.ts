import { TypedPaths } from '@/api/custom-types/typePaths';
import { set, split } from 'lodash';
import { Draft, produce } from 'immer';
import { Get, Paths } from 'type-fest';
import { HasOnlyStringKeys } from '@/components/types/stringKeysOnly';

export function updateNestedValueWithImmer<T, PType>(
  entity: T,
  path: TypedPaths<T, PType>,
  value: PType
) {
  const strings = split(path, '.');
  if (strings.length === 1) {
    return produce(entity, (draft) => {
      const key = strings[0] as keyof typeof draft;
      draft[key] = value as (typeof draft)[typeof key];
    });
  } else if (strings.length > 1) {
    const key = strings[0] as keyof typeof entity;
    const nestedEntity = entity[key];
    const remainingPath = strings.slice(1).join('.');
    const updatedNested = updateNestedValueWithImmer(
      nestedEntity,
      remainingPath as TypedPaths<typeof nestedEntity, PType>,
      value
    );
    return produce(entity, (draft) => {
      const draftKey = key as keyof Draft<T>;
      draft[draftKey] = updatedNested as (typeof draft)[typeof draftKey];
    });
  } else {
    throw new Error('Paths did not result in mutable field; or other error.');
  }
}

export function updateNestedValue<T, PType>(
  entity: T,
  path: TypedPaths<T, PType>,
  value: PType
) {
  const strings = split(path, '.');
  if (strings.length === 1) {
    const draft = { ...entity };
    const key = strings[0] as keyof typeof draft;
    draft[key] = value as (typeof draft)[typeof key];
    return draft;
  } else if (strings.length > 1) {
    const key = strings[0] as keyof typeof entity;
    const nestedEntity = entity[key];
    const remainingPath = strings.slice(1).join('.');
    const updatedNested = updateNestedValue(
      nestedEntity,
      remainingPath as TypedPaths<typeof nestedEntity, PType>,
      value
    );
    const draft = { ...entity };
    draft[key] = updatedNested as (typeof draft)[typeof key];
    return draft;
  } else {
    throw new Error('Paths did not result in mutable field; or other error.');
  }
}

export function updateNestedValueWithLodash<
  TState extends HasOnlyStringKeys<TState>,
  TPath extends Paths<TState> & string,
  TPathType extends Get<TState, TPath>
>(entity: TState, path: TPath, value: TPathType) {
  return set(structuredClone(entity), path, value);
}
