import { HasId } from '@/api/main';
import {
  DtoComponentWrapper,
  DtoComponentWrapperProps,
  DtoUiComponent
} from 'dto-stores';

export type DtoComponentWrapperListViewProps<T extends HasId, Props> = {
  entityList: T[];
  entityClass: string;
  eachAs: DtoUiComponent<T, Props>;
} & Props;

export function DtoComponentWrapperListView<T extends HasId, Props>({
  entityList,
  entityClass,
  eachAs,
  ...props
}: DtoComponentWrapperListViewProps<T, Props>) {
  return entityList.map((entity) => {
    const finalProps = {
      entityClass,
      id: entity.id,
      renderAs: eachAs,
      ...props
    } as DtoComponentWrapperProps<T, Props>;
    return (
      <DtoComponentWrapper
        key={`${entityClass}:${entity.id}`}
        {...finalProps}
      />
    );
  });
}
