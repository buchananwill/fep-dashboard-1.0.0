import { LazyDtoUiWrapper } from 'dto-stores';
import { NamedEntityLabel } from '@/components/feasibility-report/WorkSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { HasNameDto } from '@/api/generated-types/generated-types_';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { HasId } from '@/api/types';
import { Loading } from '@/components/feasibility-report/Loading';

export default function RenderOrganizationCell({
  rowIndex,
  columnIndex,
  data,
  style,
  location = 'rowId'
}: CellWrapperProps & { location?: 'rowId' | 'columnId' }) {
  return (
    <div style={style} className={'flex'}>
      <LazyDtoUiWrapper<HasId & HasNameDto, GenericDivProps>
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
