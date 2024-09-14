import { LazyDtoUiWrapper } from 'dto-stores';
import { NamedEntityLabel } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { Loading } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import { HasName } from '@/api/generated-types/generated-types';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { HasId } from '@/api/types';
import { useFloatingTooltip } from '@/components/tooltip/useFloatingTooltip';

export default function RenderOrganizationCell({
  rowIndex,
  columnIndex,
  data,
  style,
  location = 'rowId'
}: CellWrapperProps & { location?: 'rowId' | 'columnId' }) {
  return (
    <div style={style} className={'flex'}>
      <LazyDtoUiWrapper<HasId & HasName, GenericDivProps>
        renderAs={(props) => (
          <NamedEntityLabel
            {...props}
            className={'center-vertical-with-margin truncate text-xs'}
          />
        )}
        entityId={data[rowIndex][columnIndex][location]}
        entityClass={EntityClassMap.organization}
        whileLoading={Loading}
      />
    </div>
  );
}
