'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import WorkTaskTypeTable from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeTable';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseNode';

export default function TabbedSelectorTables({
  workTaskTypes,
  ...divProps
}: {
  workTaskTypes: WorkTaskTypeDto[];
} & Omit<GenericDivProps, 'children'>) {
  return (
    <div {...divProps}>
      <Tabs>
        <Tab key={EntityClassMap.workTaskType} title={'Work Task Types'}>
          <WorkTaskTypeTable workTaskTypes={workTaskTypes} />
        </Tab>
      </Tabs>
    </div>
  );
}
