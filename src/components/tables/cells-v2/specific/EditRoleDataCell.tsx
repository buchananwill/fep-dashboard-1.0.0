import { IdInnerCellProps } from '@/components/tables/core-table-types';
import {
  RoleData,
  RolePostRequest,
  SuitabilitySummaryDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types_';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { IdWrapper } from '@/api/types';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { useCallback, useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { Button, Card, Loader, Pill, Tabs } from '@mantine/core';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { useGlobalDispatch, useGlobalReadAny } from 'selective-context';
import { availabilityToOutlookEvent } from '@/components/roles/create-role/RoleSubmissionHandler';
import { EventClickArg } from '@fullcalendar/core';
import {
  PopoverSingleton,
  PopoverSingletonContextInterface
} from '@/components/generic/PopoverSingleton';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { getDayAndTime } from '@/components/tables/cells-v2/specific/getDayAndTime';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { EntityClassMap } from '@/api/entity-class-map';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { joinWorkTaskTypeKey } from '@/functions/workProjectSeriesSchemaIdTransforms';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { useTransientState } from '@/hooks/useTransientState';
import { EmptyArray } from '@/api/literals';

type RoleDataCellProps = IdInnerCellProps<
  IdWrapper<RolePostRequest<any>>['data']['roleDataMap']
>;

export function EditRoleDataCell(props: RoleDataCellProps) {
  const strings = props.value ? Object.keys(props.value) : [];

  return (
    <ModalEditCell buttonLabel={`Roles: ${strings.length}`}>
      {({ onClose }) => <RoleDataModalContent {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

const CalendarEventPopover = 'calendarEventPopover';

function RoleDataModalContent({
  value,
  onClose,
  onChange
}: RoleDataCellProps & { onClose: () => void }) {
  const getRoleTypeNames = useCallback(() => {
    return Object.keys(value);
  }, [value]);

  // SUITABILITY SECTION
  // TODO Limit fetching to the WorkTaskTypes that are relevant to the selected Role Type.
  const { data, isLoading } = useQuery({
    queryFn: Api.WorkTaskType.getAll,
    queryKey: [EntityClassMap.workTaskType, 'all']
  });

  const { transientState, setTransientState, transientStateRef } =
    useTransientState<WorkTaskTypeDto[]>();

  const selectApi = useSelectApi<SelectApiParamsMultiFlat<WorkTaskTypeDto>>({
    rawData: data ?? EmptyArray,
    labelMaker: joinWorkTaskTypeKey,
    value: transientState ?? EmptyArray,
    propagateChange: setTransientState,
    type: 'multiFlat'
  });

  const compileSuitabilitiesWithoutSetting = useCallback(() => {
    const selectedWorkTaskTypes = transientStateRef.current ?? [];
    const suitabilitiesWithoutRoleTypes = selectedWorkTaskTypes.map(
      (wtt) =>
        ({
          rating: 1,
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
                dispatchWithoutListen((prev) => ({
                  ...prev,
                  content: <div>No event content</div>,
                  rootNodeRef: { ...prev.rootNodeRef, current: null },
                  isOpen: false
                }));
              }}
            >
              Delete
            </Button>
          </Card>
        ),
        isOpen: true,
        rootNodeRef: { ...prev.rootNodeRef, current: eventClickInfo.el }
      }));
    },
    [dispatchWithoutListen]
  );

  const events = useMemo(() => {
    return currentState
      .map(flattenTimesIntoEvent)
      .map((event) => ({ ...event, editable: true, overlap: false }));
  }, [currentState]);

  return (
    <>
      <Tabs
        classNames={{
          panel: 'relative flex h-[80vh] w-[75vw] gap-2'
        }}
        defaultValue={'suitabilities'}
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
          <div className={'w-full'}>
            <CalendarViewer
              events={events}
              headerToolbar={{
                left: '',
                center: '',
                right: ''
              }}
              {...callbacks}
              eventClick={eventClick}
            ></CalendarViewer>
            <PopoverSingleton contextKey={CalendarEventPopover} />
          </div>
        </Tabs.Panel>
      </Tabs>
      <ModalConfirmationFooter
        onCancel={onClose}
        confirmLabel={'Update Role Data'}
        onConfirm={() => {
          const availabilities = compileAvailabilitiesWithoutSetting();
        }}
      />
    </>
  );
}
