import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { useCellIdReferences } from '@/components/work-task-types/useCellIdReferences';
import { Identifier } from 'dto-stores';
import FallbackCell from '@/components/grids/FallbackCell';
import { useDtoStoreDispatchAndListener } from 'dto-stores/dist/hooks/main/store/useDtoStoreDispatchAndListener';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';

export function KnowledgeDomainRowHeader(props: CellWrapperProps<number>) {
  const { rowId } = useCellIdReferences<number, Identifier>(props);

  return rowId !== undefined ? (
    <KnowledgeDomainCell {...props} entityId={rowId} />
  ) : (
    <FallbackCell {...props} />
  );
}

function KnowledgeDomainCell({
  entityId,
  style
}: CellWrapperProps & { entityId: number }) {
  const { currentState } = useDtoStoreDispatchAndListener<KnowledgeDomainDto>(
    entityId,
    EntityClassMap.knowledgeDomain
  );

  return <div style={style}>{currentState.name}</div>;
}
