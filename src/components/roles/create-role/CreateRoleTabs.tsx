'use client';
import { Tabs } from '@nextui-org/tabs';
import { Tab } from '@nextui-org/react';
import FinderTableButton from '@/components/tables/FinderTableButton';
import WorkTaskTypeMatrix from '@/components/work-task-types/WorkTaskTypeMatrix';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import { RoleEntity } from '@/components/roles/types';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';

interface CreateRoleProps {
  knowledgeDomains: KnowledgeDomainDto[];
  knowledgeLevels: KnowledgeLevelDto[];
  roleEntity: RoleEntity;
}

export default function CreateRoleTabs({
  knowledgeDomains,
  knowledgeLevels,
  roleEntity
}: CreateRoleProps) {
  const { currentState, ...callbacks } = useEditableEvents();

  const events = useMemo(() => {
    return currentState
      .map(flattenTimesIntoEvent)
      .map((event) => ({ ...event, editable: true, overlap: false }));
  }, [currentState]);

  return (
    <Tabs
      placement={'top'}
      classNames={{
        panel: 'relative flex h-[80vh] w-[75vw] gap-2'
      }}
    >
      <Tab title={'Set Suitabilities'} id={'suitabilities'}>
        <FinderTableButton
          knowledgeDomain={knowledgeDomains}
          knowledgeLevel={knowledgeLevels}
        />
        <WorkTaskTypeMatrix />
      </Tab>
      <Tab title={'Set Availabilities'} id={'availabilities'}>
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
      </Tab>
    </Tabs>
  );
}
