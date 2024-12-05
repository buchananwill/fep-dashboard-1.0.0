import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Badge, Button, Loader, Modal, Pill } from '@mantine/core';
import { QueueListIcon } from '@heroicons/react/24/outline';
import { NamespacedHooks, useDtoStore } from 'dto-stores';
import {
  CarouselGroupDto,
  CarouselOrderSummaryDto,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { WpssTransferList } from '@/components/work-project-series-schema/WpssTransferList';
import { joinWorkProjectSeriesSchemaIdKey } from '@/functions/workProjectSeriesSchemaIdTransforms';
import { isNotUndefined } from '@/api/main';
import { useDisclosure } from '@mantine/hooks';

export function OrderItemTransferListCell({
  value,
  onChange,
  entityId,
  entityClass
}: IdInnerCellProps<string>) {
  const count = value?.split(';')?.length;
  const [opened, { open, close, toggle }] = useDisclosure();
  return (
    <>
      <Button
        leftSection={<QueueListIcon className={'w-6'} />}
        fullWidth
        variant={'subtle'}
        onClick={open}
      >
        {count} Order Items
      </Button>
      <Modal opened={opened} onClose={close} size={'auto'}>
        <CarouselOrderTransferList
          entityId={entityId}
          entityClass={entityClass}
          value={value}
          onChange={onChange}
          onClose={close}
        />
      </Modal>
    </>
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
          (option) => option.workProjectSeriesSchemaId
        )
      : [];
  }, [subscribedCarouselGroup]);

  const { data, isLoading } = useQuery({
    queryFn: () =>
      Api.WorkProjectSeriesSchema.getDtoListByBodyList(schemaIdList),
    queryKey: [EntityClassMap.workProjectSeriesSchema, ...schemaIdList]
  });

  const idWrapperData = useMemo(() => {
    return data
      ? data.map((wpss) => ({
          id: joinWorkProjectSeriesSchemaIdKey(wpss),
          data: wpss
        }))
      : [];
  }, [data]);
  const availableSchemas = useMemo(() => {
    return (
      data?.reduce(
        (prev, curr) => prev.set(joinWorkProjectSeriesSchemaIdKey(curr), curr),
        new Map<string, WorkProjectSeriesSchemaDto>()
      ) ?? new Map<string, WorkProjectSeriesSchemaDto>()
    );
  }, [data]);
  const selectedSchemas = useMemo(() => {
    return optionListSplit
      ? optionListSplit
          .map((joinedId) => availableSchemas.get(joinedId))
          .filter(isNotUndefined)
      : [];
  }, [optionListSplit, availableSchemas]);

  const [optionList, setOptionList] = useState(
    [] as WorkProjectSeriesSchemaDto[]
  );
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
    console.log(idWrapperData);
    return () => dispatch(EmptyArray);
  }, [idWrapperData, dispatch, data]);

  const propagateChange = useCallback(
    (list: WorkProjectSeriesSchemaDto[] | undefined) => {
      if (list && Array.isArray(list)) setOptionList(list);
    },
    []
  );

  const updateOrderAndClose = useCallback(() => {
    onChange &&
      onChange(
        optionListRef.current.map(joinWorkProjectSeriesSchemaIdKey).join(';')
      );
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
      <div className={'center-all-margin flex w-fit gap-4 pt-4'}>
        <Button color={'red'} variant={'subtle'} onClick={onClose}>
          Cancel
        </Button>
        <Button color={'primary'} onClick={updateOrderAndClose}>
          Update Order
        </Button>
      </div>
    </>
  );
}
