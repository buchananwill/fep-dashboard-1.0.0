'use client';

import { Button, Card, Stepper } from '@mantine/core';
import { useStepperState } from '@/components/work-plan-request/useStepperState';
import classes from './work-plan-wizard.module.css';
import pushable from '../../css-modules/pushable-button.module.css';

import { useCallback, useMemo } from 'react';
import { steps } from '@/components/work-plan-request/steps/Steps';
import {
  workPlanGeneratorWizard,
  WorkPlanRequestController
} from '@/components/work-plan-request/WorkPlanRequestController';
import { WorkPlanRequestWizardStepWrapper } from '@/components/work-plan-request/steps/WorkPlanRequestWizardStepWrapper';
import { useGlobalReadAny } from 'selective-context';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { submitWorkPlanRequest } from '@/app/data-entry/test/submitWorkPlanRequest';

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

  const readAny = useGlobalReadAny<WorkPlanRequest>();
  const readRequest = useCallback(() => {
    return readAny(workPlanGeneratorWizard);
  }, [readAny]);

  const onSubmit = useCallback(async () => {
    const request = readRequest();
    if (request) {
      const response = await submitWorkPlanRequest(request);
    }
  }, [readRequest]);

  return (
    <Card mt={'xs'}>
      <WorkPlanRequestController />
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
          <WorkPlanRequestWizardStepWrapper>
            {(props) => <Component {...props} />}
          </WorkPlanRequestWizardStepWrapper>
          <div className={classes.spacer}></div>
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
                onClick={onSubmit}
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
