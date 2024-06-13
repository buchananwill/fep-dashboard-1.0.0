import { GridChildComponentProps } from 'react-window';
import React, {
  forwardRef,
  memo,
  ReactElement,
  useCallback,
  useRef
} from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/app/service-categories/[id]/roles/providers/_components/TooltipSingleton';
import { Placement } from '@floating-ui/react';
import clsx from 'clsx';

const SyncedRowCell = ({
  style,
  columnIndex
}: GridChildComponentProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]>) => {
  const uuidListenerKey = useUuidListenerKey();
  const readAnyWorkTaskType = useReadAnyDto<WorkTaskTypeDto>(
    EntityClassMap.workTaskType
  );
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.workTaskType,
    KEY_TYPES.SELECTED,
    uuidListenerKey,
    EmptyArray as number[]
  );

  const wttId = currentState[columnIndex];

  const name = readAnyWorkTaskType(wttId)?.name ?? 'No Data Found';

  const tooltip = useFloatingTooltip(<TooltipMemo text={name} />, 'bottom');

  return (
    <div
      style={style}
      className={clsx(
        'border-x-1 first:border-l-0 ',
        columnIndex % 2 === 1 ? 'bg-purple-50' : 'bg-sky-50'
      )}
      {...tooltip}
    >
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedRowCellMemo = memo(SyncedRowCell);

function useFloatingTooltip(
  content: ReactElement | string | number,
  placement: Placement = 'right'
) {
  const ref = useRef(null);
  const { dispatchWithoutListen: dispatchTooltip } =
    useGlobalDispatch<TooltipContextInterface>(TooltipContext);
  const onMouseOver = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: true,
        rootNodeRef: ref,
        content,
        placement
      };
    });
  }, [dispatchTooltip, ref, content, placement]);
  const onMouseOut = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: false
      };
    });
  }, [dispatchTooltip]);
  return { ref, onMouseOver, onMouseOut };
}

const SyncedColumnCell = ({
  style,
  rowIndex
}: GridChildComponentProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]>) => {
  const uuidListenerKey = useUuidListenerKey();
  const readAnyProviderRole = useReadAnyDto<ProviderRoleDto>(
    EntityClassMap.providerRole
  );
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.providerRole,
    KEY_TYPES.SELECTED,
    uuidListenerKey,
    EmptyArray as number[]
  );

  const prId = currentState[rowIndex];

  const name = readAnyProviderRole(prId)?.partyName ?? 'No Data Found';
  const tooltip = useFloatingTooltip(<TooltipMemo text={name} />);

  return (
    <div
      style={style}
      className={' border-y-1 bg-white first:border-t-0'}
      {...tooltip}
    >
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedColumnCellMemo = memo(SyncedColumnCell);

const InnerCellComponent = forwardRef<
  HTMLDivElement,
  {
    children: string | number | ReactElement;
  }
>(function InnerCellComponent({ children }, ref) {
  return (
    <div ref={ref} className={'relative flex h-full items-center align-middle'}>
      <div
        className={
          'mb-auto mt-auto inline-block h-fit w-full overflow-hidden overflow-ellipsis whitespace-nowrap p-1 text-sm   '
        }
      >
        {children}
      </div>
    </div>
  );
});

const TooltipMemo = memo(SimpleTooltip);

function SimpleTooltip({ text }: { text: string }) {
  return (
    <div
      className={
        'pointer-events-none rounded-md border border-amber-300 bg-amber-50 p-2 text-black'
      }
    >
      {text}
    </div>
  );
}
