'use client';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import {
  AssetDto,
  PersonDto,
  RoleData,
  RolePostRequest,
  SuitabilitySummaryDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { IdWrapper } from '@/api/types';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { useCallback, useEffect, useMemo, useRef, useTransition } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { Button, Card, Loader, Pill, Tabs, Text } from '@mantine/core';
import { defaultOptions } from '@/components/calendar/full-calendar/FullCalendar';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { useGlobalDispatch, useGlobalReadAny } from 'selective-context';
import { availabilityToOutlookEvent } from '@/components/roles/create-role/RoleSubmissionHandler';
import { EventClickArg } from '@fullcalendar/core';
import {
  PopoverSingleton,
  PopoverSingletonContextInterface
} from '@/components/generic/PopoverSingleton';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { getDayAndTime } from '@/components/tables/cells-v2/specific/getDayAndTime';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import {
  joinWorkTypeKey,
  joinWorkTypeKeyFromSuitability
} from '@/functions/workSchemaIdTransforms';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { useTransientState } from '@/hooks/useTransientState';
import { EmptyArray } from '@/api/client-literals';
import { usePropagateRoleDataChange } from '@/components/roles/create-role/usePropagateRoleDataChange';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import FullCalendar from '@fullcalendar/react';
import { isNotUndefined } from '@/api/main';
import { useDtoStore } from 'dto-stores';

type RoleDataCellProps = IdInnerCellProps<
  IdWrapper<RolePostRequest<any>>['data']['roleDataMap']
>;

export function EditRoleDataCell(props: RoleDataCellProps) {
  const roleTypeNames = useMemo(() => {
    return props.value ? Object.keys(props.value) : [];
  }, [props.value]);

  const roleTypeName = useMemo(() => {
    if (roleTypeNames.length > 1)
      throw Error('multiple role types in a single record not yet supported.');
    if (roleTypeNames.length === 0) throw Error('Role type name not found');
    else return roleTypeNames[0];
  }, [roleTypeNames]);

  return (
    <ModalEditCell
      buttonLabel={`Roles: ${roleTypeNames.length}`}
      title={
        <Text fw={700} size={'lg'}>
          Role Type - {roleTypeName}
        </Text>
      }
    >
      {({ onClose }) => <RoleDataModalContent {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

const CalendarEventPopover = 'calendarEventPopover';

const DEFAULT_VALUE_FOR_IS_SUITABLE = 1;

function RoleDataModalContent({
  value,
  onClose,
  onChange,
  entityId,
  entityClass
}: RoleDataCellProps & { onClose: () => void }) {
  const { entity } = useDtoStore<IdWrapper<RolePostRequest<any>>>({
    entityId,
    entityClass,
    listenerKey: 'roleDateModalContent'
  });

  const entityName = useMemo(() => {
    switch (entityClass) {
      case EntityClassMap.assetRolePostRequest: {
        const asset = entity as IdWrapper<RolePostRequest<AssetDto>>;
        return asset.data.baseEntity.name;
      }
      case EntityClassMap.providerRolePostRequest: {
        const asset = entity as IdWrapper<RolePostRequest<PersonDto>>;
        const person = asset.data.baseEntity;
        return `${person.fName} ${person.lName}`;
      }
      default:
        throw Error(`Unsupported role type: ${entityClass}`);
    }
  }, [entityClass, entity]);

  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    const currentContainerRef = containerRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (calendarApi) calendarApi.updateSize();
    });

    if (currentContainerRef) {
      resizeObserver.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        resizeObserver.unobserve(currentContainerRef);
      }
    };
  }, []);

  const [isPending, startTransition] = useTransition();

  const getRoleTypeNames = useCallback(() => {
    return Object.keys(value);
  }, [value]);

  // SUITABILITY SECTION
  // TODO Limit fetching to the WorkTypes that are relevant to the selected Role Type.
  const { data, isLoading } = useQuery({
    queryFn: Api.WorkType.getAll,
    queryKey: [EntityClassMap.workType, 'all']
  });

  const { transientState, setTransientState, transientStateRef } =
    useTransientState<WorkTypeDto[]>();

  const wttMap = useMemo(() => {
    return (data ?? []).reduce(
      (prev, curr) => prev.set(joinWorkTypeKey(curr), curr),
      new Map<string, WorkTypeDto>()
    );
  }, [data]);

  useEffect(() => {
    const workTypes = Object.values(value)
      .flatMap((roleData) => roleData.suitabilities)
      .map((suitabilitySummary) =>
        joinWorkTypeKeyFromSuitability(suitabilitySummary)
      )
      .map((key) => wttMap.get(key))
      .filter(isNotUndefined);

    const unique = [...new Set(workTypes)];
    setTransientState(unique);
  }, [value, wttMap, setTransientState]);

  const selectApi = useSelectApi<SelectApiParamsMultiFlat<WorkTypeDto>>({
    rawData: data ?? EmptyArray,
    labelMaker: joinWorkTypeKey,
    value: transientState ?? EmptyArray,
    propagateChange: setTransientState,
    type: 'multiFlat'
  });

  const compileSuitabilitiesWithoutSetting = useCallback(() => {
    const selectedWorkTypes = transientStateRef.current ?? [];
    const suitabilitiesWithoutRoleTypes = selectedWorkTypes.map(
      (wtt) =>
        ({
          rating: DEFAULT_VALUE_FOR_IS_SUITABLE,
          knowledgeDomainName: wtt.knowledgeDomain.name,
          knowledgeLevelName: wtt.knowledgeLevel?.name,
          taskTypeName: wtt.name
        }) as SuitabilitySummaryDto
    );
    const kvPairs = Object.keys(value).map((roleTypeNameKey) => {
      const suitabilities = suitabilitiesWithoutRoleTypes.map(
        (suit) =>
          ({ ...suit, roleTypeName: roleTypeNameKey }) as SuitabilitySummaryDto
      );
      return [roleTypeNameKey, { suitabilities }] as [string, RoleData];
    });
    return Object.fromEntries(kvPairs) as Record<string, RoleData>;
  }, [value, transientStateRef]);

  // AVAILABILITY SECTION

  const readAny = useGlobalReadAny();

  const initialEvents = useMemo(() => {
    return Object.values(value)
      .flatMap((data) => data.availabilities)
      .map((aSum) => availabilityToOutlookEvent(aSum));
  }, [value]);

  const compileAvailabilitiesWithoutSetting = useCompileAvailabilities(
    readAny,
    getRoleTypeNames
  );

  const { currentState, ...callbacks } = useEditableEvents({ initialEvents });

  const { dispatchWithoutListen } =
    useGlobalDispatch<PopoverSingletonContextInterface>(CalendarEventPopover);
  const closeEventPopover = useCallback(() => {
    dispatchWithoutListen((prev) => ({
      ...prev,
      content: <div>No event content</div>,
      rootNodeRef: { ...prev.rootNodeRef, current: null },
      isOpen: false
    }));
  }, [dispatchWithoutListen]);

  // TODO: make the event editable from within the Popover.
  const eventClick = useCallback(
    (eventClickInfo: EventClickArg) => {
      dispatchWithoutListen((prev) => ({
        ...prev,
        content: (
          <Card className={'flex flex-col gap-2'}>
            <div>
              Role: <Pill>{eventClickInfo.event.title}</Pill>
            </div>
            <div>
              Availability Block: {getDayAndTime(eventClickInfo.event.start)} -{' '}
              {getDayAndTime(eventClickInfo.event.end)}
            </div>
            <Button
              color={'red'}
              rightSection={<TrashIcon className={'w-6'} />}
              onClick={() => {
                eventClickInfo.event.remove();
                closeEventPopover();
              }}
            >
              Delete
            </Button>
            <Button
              classNames={{ root: 'absolute top-2 right-2 w-fit h-fit p-1' }}
              radius={'xl'}
              variant={'subtle'}
              color={'black'}
              onClick={closeEventPopover}
            >
              <XMarkIcon className={'w-6'} />
            </Button>
          </Card>
        ),
        isOpen: true,
        rootNodeRef: { ...prev.rootNodeRef, current: eventClickInfo.el }
      }));
    },
    [dispatchWithoutListen, closeEventPopover]
  );

  const events = useMemo(() => {
    return currentState
      .map(flattenTimesIntoEvent)
      .map((event) => ({ ...event, editable: true, overlap: false }));
  }, [currentState]);

  const onConfirm = usePropagateRoleDataChange({
    compileAvailabilitiesWithoutSetting,
    compileSuitabilityRequestWithoutSetting: compileSuitabilitiesWithoutSetting,
    propagateRoleDataChange: onChange ?? noop
  });

  return (
    <>
      {isPending && <PendingOverlay pending={isPending} />}
      Name - {entityName}
      <Tabs
        classNames={{
          panel: 'relative flex h-[24em] w-[60em] gap-2'
        }}
        defaultValue={'availabilities'}
      >
        <Tabs.List>
          <Tabs.Tab value={'suitabilities'} id={'suitabilities'}>
            Set Suitabilities
          </Tabs.Tab>
          <Tabs.Tab id={'availabilities'} value={'availabilities'}>
            Set Availabilities
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={'suitabilities'}>
          {isLoading ? <Loader /> : <TransferList {...selectApi} mah={300} />}
        </Tabs.Panel>
        <Tabs.Panel value={'availabilities'}>
          <div className={'h-full w-full'} ref={containerRef}>
            <FullCalendar
              {...defaultOptions}
              ref={calendarRef}
              dayHeaderContent={(props) =>
                new Intl.DateTimeFormat('en-GB', {
                  weekday: 'short'
                }).format(props.date)
              }
              events={events}
              headerToolbar={{
                left: '',
                center: '',
                right: ''
              }}
              {...callbacks}
              eventClick={eventClick}
              allDaySlot={false}
            />

            <PopoverSingleton
              contextKey={CalendarEventPopover}
              transitionStyleProps={{ duration: 50 }}
              placement={'top'}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
      <ModalConfirmationFooter
        onCancel={onClose}
        confirmLabel={'Update Role Data'}
        onConfirm={() => {
          startTransition(() => {
            onConfirm();
            onClose();
          });
        }}
      />
    </>
  );
}

function noop(value: any) {}
