import { HasId } from '@/app/api/main';
import { DtoComponentWrapper, DtoUiComponent } from 'dto-stores';

export function DtoComponentWrapperListView<T extends HasId>({
  entityList,
  entityClass,
  eachAs
}: {
  entityList: T[];
  entityClass: string;
  eachAs: DtoUiComponent<T>;
}) {
  return entityList.map((entity) => (
    <DtoComponentWrapper
      entityClass={entityClass}
      id={entity.id}
      key={`${entityClass}:${entity.id}`}
      uiComponent={eachAs}
    />
  ));
}
