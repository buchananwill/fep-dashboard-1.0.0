'use client';
import { Card, Loader, RingProgress, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getInitializationStatus } from '@/api/actions-custom/schemas/getInitializationStatus';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import classes from './migrationProgressTracker.module.css';

/*
 * Todo:
 *  1. Create endpoint that retrieves the template progress for a signed in user.
 *  2. Add the "target template" field to the tenancy table
 *  3. Add an effect that polls the database every 5 seconds to check for updates in the progress.
 * */

export function MigrationProgressTracker({
  progress = dummyProgress
}: {
  progress?: TemplateProgress;
}) {
  const { isFetching, data } = useQuery({
    queryFn: getInitializationStatus,
    queryKey: ['initialization-status'],
    refetchInterval: 5_000
  });

  if (!data) return <Loader />;

  const { templatesQueued, templatesLoaded } = data;
  const totalTemplates = templatesQueued.length + templatesLoaded.length;
  const completedValue = (templatesLoaded.length / totalTemplates) * 100;
  const pendingValue = (templatesQueued.length / totalTemplates) * 100;
  return (
    <Card>
      <Title>Initialization Progress</Title>
      <RingProgress
        label={
          <Text ta={'center'}>
            Last template loaded:
            <br /> {templatesLoaded[templatesLoaded.length - 1]}
            <br />
          </Text>
        }
        size={320}
        thickness={30}
        transitionDuration={250}
        sections={[
          {
            value: completedValue,
            color: 'success'
          },
          {
            value: pendingValue,
            color: 'amberSunrise'
          }
        ]}
        classNames={{
          root: 'center-horizontal-with-margin'
        }}
      />
      {completedValue < 100 && (
        <Loader type={'dots'} className={'center-all-margin'} />
      )}
      {completedValue === 100 && (
        <CheckCircleIcon className={classes.checkIcon} />
      )}
    </Card>
  );
}

export type TemplateProgress = {
  templatesLoaded: string[];
  templatesQueued: string[];
};

const dummyProgress = {
  templatesLoaded: [
    '30 Secondary Subjects',
    'Basic school premises features',
    'Basic school organization types.'
  ],
  templatesQueued: [
    'Student is the only user role type.',
    'Two week cycle Monday late start.',
    'Teaching work task type name.',
    'Primary and secondary UK school years.'
  ]
} as TemplateProgress;
