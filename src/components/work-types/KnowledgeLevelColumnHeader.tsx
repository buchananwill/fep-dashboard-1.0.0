import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { Identifier } from 'dto-stores';
import { useCellIdReferences } from '@/components/work-types/useCellIdReferences';
import FallbackCell from '@/components/grids/FallbackCell';
import { useDtoStoreDispatchAndListener } from 'dto-stores/dist/hooks/main/store/useDtoStoreDispatchAndListener';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types_';
import { EntityClassMap } from '@/api/entity-class-map';
import { CellWrapperPropsWithId } from '@/components/work-types/WorkTypeMatrix';

export function KnowledgeLevelColumnHeader(
  props: CellWrapperProps<Identifier, number>
) {
  const { columnId } = useCellIdReferences<Identifier, number>(props);

  return columnId ? (
    <KnowledgeLevelCell {...props} entityId={columnId} />
  ) : (
    <FallbackCell {...props} />
  );
}

function KnowledgeLevelCell({
  entityId,
  style
}: CellWrapperPropsWithId<number>) {
  const { currentState } = useDtoStoreDispatchAndListener<KnowledgeLevelDto>(
    entityId,
    EntityClassMap.knowledgeLevel
  );

  return <div style={style}>{currentState.levelOrdinal}</div>;
}
