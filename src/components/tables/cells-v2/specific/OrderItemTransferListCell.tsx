import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Badge, Loader, Pill } from '@mantine/core';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { NamespacedHooks, useDtoStore } from 'dto-stores';
import {
  CarouselGroupDto,
  CarouselOrderSummaryDto,
  WorkSchemaDto
} from '@/api/generated-types/generated-types_';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/client-literals';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { WpssTransferList } from '@/components/work-schema/WpssTransferList';
import { joinWorkSchemaIdKey } from '@/functions/workSchemaIdTransforms';
import { isNotUndefined } from '@/api/main';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';

export function OrderItemTransferListCell({
  value,
  onChange,
  entityId,
  entityClass
}: IdInnerCellProps<string>) {
  const count = value?.split(';')?.length;

  return (
    <ModalEditCell
      leftSection={<QueueListIcon className={'w-6'} />}
      buttonLabel={<>{count} Order Items</>}
    >
      {({ onClose }) => (
        <CarouselOrderTransferList
          entityId={entityId}
          entityClass={entityClass}
          value={value}
          onChange={onChange}
          onClose={onClose}
        />
      )}
    </ModalEditCell>
  );
}

function CarouselOrderTransferList({
  value,
  onChange,
  entityId,
  entityClass,
  onClose
}: IdInnerCellProps<string> & { onClose: () => void }) {
  const { entity } = useDtoStore<CarouselOrderSummaryDto>({
    entityId,
    entityClass
  });
  const optionListSplit = useMemo(() => {
    return value.split(';');
  }, [value]);
  const listenerKey = useUuidListenerKey();
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.carouselGroup,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as CarouselGroupDto[]
  );

  const subscribedCarouselGroup = useMemo(() => {
    return currentState.find((cg) => cg.name === entity.carouselGroupName);
  }, [currentState, entity]);

  const schemaIdList = useMemo(() => {
    return subscribedCarouselGroup
      ? subscribedCarouselGroup.carouselGroupOptions.map(
          (option) => option.workSchemaId
        )
      : [];
  }, [subscribedCarouselGroup]);

  const { data, isLoading } = useQuery({
    queryFn: () => Api.WorkSchema.getDtoListByBodyList(schemaIdList),
    queryKey: [EntityClassMap.workSchema, ...schemaIdList]
  });

  const idWrapperData = useMemo(() => {
    return data
      ? data.map((wpss) => ({
          id: joinWorkSchemaIdKey(wpss),
          data: wpss
        }))
      : [];
  }, [data]);
  const availableSchemas = useMemo(() => {
    return (
      data?.reduce(
        (prev, curr) => prev.set(joinWorkSchemaIdKey(curr), curr),
        new Map<string, WorkSchemaDto>()
      ) ?? new Map<string, WorkSchemaDto>()
    );
  }, [data]);
  const selectedSchemas = useMemo(() => {
    return optionListSplit
      ? optionListSplit
          .map((joinedId) => availableSchemas.get(joinedId))
          .filter(isNotUndefined)
      : [];
  }, [optionListSplit, availableSchemas]);

  const [optionList, setOptionList] = useState([] as WorkSchemaDto[]);
  const optionListRef = useRef(optionList);
  optionListRef.current = optionList;

  // In case the entity is available on the first render, we need to sync the initial list as soon as it is.
  useEffect(() => {
    setOptionList(selectedSchemas);
  }, [selectedSchemas]);

  const dispatch = NamespacedHooks.useDispatch(
    'IdWrapper',
    KEY_TYPES.MASTER_LIST
  );

  useEffect(() => {
    data && dispatch(idWrapperData);
    return () => dispatch(EmptyArray);
  }, [idWrapperData, dispatch, data]);

  const propagateChange = useCallback((list: WorkSchemaDto[] | undefined) => {
    if (list && Array.isArray(list)) setOptionList(list);
  }, []);

  const updateOrderAndClose = useCallback(() => {
    onChange &&
      onChange(optionListRef.current.map(joinWorkSchemaIdKey).join(';'));
    onClose();
  }, [onClose, onChange]);

  return (
    <>
      <h1>
        Edit Carousel Order for:{' '}
        <Pill
          size={'lg'}
          styles={{
            root: { backgroundColor: 'var(--mantine-color-tertiary-2)' }
          }}
        >
          {entity?.fName} {entity?.lName}
        </Pill>
      </h1>
      <div className={'flex justify-between p-1'}>
        <Badge className={'inline-block'}>Available</Badge>
        <Badge className={'inline-block'}>Selected</Badge>
      </div>
      {data && !isLoading ? (
        <WpssTransferList
          dtoList={data}
          selectionList={optionList}
          propagateChange={propagateChange}
        />
      ) : (
        <Loader />
      )}
      <ModalConfirmationFooter
        onCancel={onClose}
        onConfirm={updateOrderAndClose}
        confirmLabel={'Update Order'}
      />
    </>
  );
}
