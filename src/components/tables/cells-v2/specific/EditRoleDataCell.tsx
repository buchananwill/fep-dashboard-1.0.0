import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { RolePostRequest } from '@/api/generated-types/generated-types_';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { IdWrapper } from '@/api/types';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { useCallback, useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { Button, Card, Pill, Tabs } from '@mantine/core';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { useGlobalDispatch, useGlobalReadAny } from 'selective-context';
import {
  availabilityToOutlookEvent,
  mondayIsDayZero,
  toHHmmSS,
  toLocalTime
} from '@/components/roles/create-role/RoleSubmissionHandler';
import { EventClickArg } from '@fullcalendar/core';
import {
  PopoverSingleton,
  PopoverSingletonContextInterface
} from '@/components/generic/PopoverSingleton';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DayOfWeekArray } from '@/api/date-and-time';

type RoleDataCellProps = IdInnerCellProps<
  IdWrapper<RolePostRequest<any>>['data']['roleDataMap']
>;

export function EditRoleDataCell(props: RoleDataCellProps) {
  const strings = props.value ? Object.keys(props.value) : [];
  console.log({ props });
  return (
    <ModalEditCell buttonLabel={`Roles: ${strings.length}`}>
      {({ onClose }) => <RoleDataModalContent {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

const CalendarEventPopover = 'calendarEventPopover';

function getDayAndTime(start: Date | null) {
  if (start === null) return 'No date provided';
  else {
    return `${DayOfWeekArray[mondayIsDayZero(start)]} ${toHHmmSS(start)}`;
  }
}

function RoleDataModalContent({
  value
}: RoleDataCellProps & { onClose: () => void }) {
  const getRoleTypeNames = useCallback(() => {
    return Object.keys(value);
  }, [value]);

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
      <Tabs.Panel value={'suitabilities'}>Edit Suitabilities</Tabs.Panel>
      <Tabs.Panel value={'availabilities'}>
        <div className={'w-full'}>
          <CalendarViewer
            events={events}
            headerToolbar={{
              left: '',
              center: 'title',
              right: ''
            }}
            {...callbacks}
            eventClick={eventClick}
          ></CalendarViewer>
          <PopoverSingleton contextKey={CalendarEventPopover} />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}
