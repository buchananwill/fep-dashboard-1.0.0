import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { RolePostRequest } from '@/api/generated-types/generated-types_';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { IdWrapper } from '@/api/types';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { useCallback, useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { Tabs } from '@mantine/core';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { useCompileAvailabilities } from '@/components/roles/create-role/useCompileAvailabilities';
import { useGlobalReadAny } from 'selective-context';
import { availabilityToOutlookEvent } from '@/components/roles/create-role/RoleSubmissionHandler';
import { EventClickArg } from '@fullcalendar/core';
import { useDisclosure } from '@mantine/hooks';

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

  const [opened, { open, close, toggle }] = useDisclosure();

  const eventClick = useCallback((eventClickInfo: EventClickArg) => {}, []);

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
          ></CalendarViewer>
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}
