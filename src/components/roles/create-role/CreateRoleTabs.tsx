'use client';
import { Tabs } from '@nextui-org/tabs';
import { Tab } from '@nextui-org/react';
import FinderTableButton from '@/components/tables/FinderTableButton';
import WorkTaskTypeMatrix from '@/components/work-task-types/WorkTaskTypeMatrix';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';
import SelectTypeNames from '@/components/roles/create-role/SelectTypeNames';
import { RoleEntity } from '@/components/roles/types';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';

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
  return (
    <Tabs
      placement={'top'}
      classNames={{
        panel: 'relative flex h-[75vh] w-[75vw] gap-2'
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
            headerToolbar={{
              left: '',
              center: 'title',
              right: ''
            }}
          ></CalendarViewer>
        </div>
      </Tab>
    </Tabs>
  );
}
