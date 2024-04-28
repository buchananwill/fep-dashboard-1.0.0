import { HasId } from '@/app/api/main';
import { DtoComponentWrapper, DtoUiComponent } from 'dto-stores';

export interface DtoComponentWrapperListViewProps<T extends HasId> {
  entityList: T[];
  entityClass: string;
  eachAs: DtoUiComponent<T>;
}

export function DtoComponentWrapperListView<T extends HasId>({
  entityList,
  entityClass,
  eachAs
}: DtoComponentWrapperListViewProps<T>) {
  return entityList.map((entity) => (
    <DtoComponentWrapper
      entityClass={entityClass}
      id={entity.id}
      key={`${entityClass}:${entity.id}`}
      uiComponent={eachAs}
    />
  ));
}
