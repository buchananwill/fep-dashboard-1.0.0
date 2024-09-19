'use client';
import { Tabs } from '@nextui-org/tabs';
import { Tab } from '@nextui-org/react';
import FinderTableButton from '@/components/tables/FinderTableButton';
import WorkTaskTypeMatrix from '@/components/work-task-types/WorkTaskTypeMatrix';
import {
  KnowledgeDomainDto,
  KnowledgeLevelDto
} from '@/api/generated-types/generated-types';

interface CreateRoleProps {
  knowledgeDomains: KnowledgeDomainDto[];
  knowledgeLevels: KnowledgeLevelDto[];
}

export default function CreateRoleTabs({
  knowledgeDomains,
  knowledgeLevels
}: CreateRoleProps) {
  return (
    <Tabs placement={'top'}>
      <Tab title={'Set Suitabilities'} id={'suitabilities'}>
        <div className={'h-[75vh] w-[75vw]'}>
          <FinderTableButton
            knowledgeDomain={knowledgeDomains}
            knowledgeLevel={knowledgeLevels}
          />
          <WorkTaskTypeMatrix />
        </div>
      </Tab>
    </Tabs>
  );
}
