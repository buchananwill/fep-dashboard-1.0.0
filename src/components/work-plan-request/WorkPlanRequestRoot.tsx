'use client';

import { Button, Card, Group, Stepper } from '@mantine/core';
import { useStepperState } from '@/components/work-plan-request/useStepperState';
import classes from './work-plan-wizard.module.css';
import pushable from '../../css-modules/pushable-button.module.css';

import { ReactNode, useMemo } from 'react';

export function WorkPlanRequestRoot() {
  const { active, setActive, nextStep, prevStep } = useStepperState({
    steps: steps.length
  });

  const Component = useMemo(() => {
    return active >= steps.length
      ? () => 'Click Submit to generate this Lesson Plan'
      : steps[active].component
        ? steps[active].component
        : () => 'No component defined!';
  }, [active]);

  return (
    <Card>
      <Card.Section className={classes.wizardHeader}>
        Work Plan Generator Wizard
      </Card.Section>
      <Card.Section className={classes.mainContainer} px={'md'}>
        <div className={classes.stepperDiv}>
          <Stepper
            active={active}
            onStepClick={setActive}
            size={'sm'}
            orientation={'vertical'}
          >
            {steps.map(({ label, description }) => (
              <Stepper.Step
                label={label}
                description={description}
                key={label}
              ></Stepper.Step>
            ))}
          </Stepper>
        </div>
        <div className={classes.stepDiv}>
          <Component />
          <div className={classes.buttonGroup}>
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            {active < steps.length ? (
              <Button onClick={nextStep}>Next step</Button>
            ) : (
              <Button
                classNames={{
                  root: pushable.pushable,
                  label: pushable.pushableLabel
                }}
              >
                <span className={pushable.shadow}></span>
                <span className={pushable.edge}></span>
                <span className={pushable.front}>Submit</span>
              </Button>
            )}
          </div>
        </div>
      </Card.Section>
    </Card>
  );
}

const steps: {
  label: string;
  description: string;
  component?: () => ReactNode;
}[] = [
  {
    label: 'Select Year',
    description:
      'Select the year group to generate a classes and lessons plan for.'
  },
  { label: 'Name', description: 'Choose a unique name for this plan' },
  { label: 'Size', description: 'Set the total number of students' },
  {
    label: 'Independent Bundle',
    description: 'Select lesson types to be assigned as an independent bundle'
  },
  {
    label: 'Synchronized Bundles',
    description:
      'Select subsets of lessons types to be assigned as synchronized bundles'
  }
];
