import { HasId } from '@/api/main';
import { DtoUiArrayProps, DtoUiWrapper, DtoUiWrapperProps } from 'dto-stores';

export type DtoUiWrapperListViewProps<T extends HasId, Props> = DtoUiArrayProps<
  T,
  Props
> & { entityList: T[] };

export function DtoUiWrapperListView<T extends HasId, Props>({
  entityList,
  entityClass,
  renderAs,
  ...props
}: DtoUiWrapperListViewProps<T, Props>) {
  return entityList.map((entity) => {
    const finalProps = {
      entityId: entity.id,
      entityClass,
      renderAs,
      ...props
    } as DtoUiWrapperProps<T, Props> & Props;
    return <DtoUiWrapper key={`${entityClass}:${entity.id}`} {...finalProps} />;
  });
}
