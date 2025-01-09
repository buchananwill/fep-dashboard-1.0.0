'use client';

import FinderTableButton from '@/components/tables/FinderTableButton';
import WorkTypeMatrix from '@/components/work-types/WorkTypeMatrix';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types_';
import { RoleEntity } from '@/components/roles/types';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { useEditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { Tabs } from '@mantine/core';

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
      <Tabs.Panel value={'suitabilities'}>
        <FinderTableButton
          knowledgeDomain={knowledgeDomains}
          knowledgeLevel={knowledgeLevels}
        />
        <WorkTypeMatrix />
      </Tabs.Panel>
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
