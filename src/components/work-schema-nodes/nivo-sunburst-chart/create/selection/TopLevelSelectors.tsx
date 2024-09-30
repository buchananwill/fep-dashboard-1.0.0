'use client';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  CycleDto,
  HasName,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { useGlobalDispatchAndListener } from 'selective-context';
import {
  KnowledgeLevelSeriesGroupContextKey,
  KnowledgeLevelSeriesGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { TemplateKnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/templateKnowledgeLevelSeriesGroup';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { useNestedUpdateCallback } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useNestedUpdateCallback';
import { ReactNode, useCallback, useRef } from 'react';
import { DispatchState } from '@/types';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useDisclosure } from '@nextui-org/use-disclosure';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { ConfirmActionModalProps } from '@/components/modals/EditTextValueModal';

export default function TopLevelSelectors() {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      initialValue: TemplateKnowledgeLevelSeriesGroup,
      listenerKey
    }
  );

  const selectTaskType = useNestedUpdateCallback(
    dispatchWithoutControl,
    'workTaskTypeName'
  );

  const selectCycle = useNestedUpdateCallback(dispatchWithoutControl, 'cycle');
  const selectKnowledgeLevelSeries = useNestedUpdateCallback(
    dispatchWithoutControl,
    'knowledgeLevelSeries'
  );

  const { isOpen, onOpen, onClose, ...otherDisclosureProps } = useDisclosure();

  const proposedUpdateRef = useRef<KnowledgeLevelSeriesDto | undefined>(
    undefined
  );

  const interceptSeriesChange = useCallback(
    (updatedValue: KnowledgeLevelSeriesDto | undefined) => {
      if (currentState.knowledgeLevelSeries !== updatedValue) {
        proposedUpdateRef.current = updatedValue;
        onOpen();
      }
    },
    [onOpen, currentState]
  );

  const confirmUpdate = useCallback(() => {
    selectKnowledgeLevelSeries(proposedUpdateRef.current);
  }, [selectKnowledgeLevelSeries]);

  const klsLabel = getStartCaseDomainAlias('knowledgeLevelSeries');

  return (
    <div className={'grid grid-cols-2 gap-2 p-2'}>
      <div className={'col-span-2 flex justify-center p-4'}>
        <ControlledSelector<number, KnowledgeLevelSeriesDto>
          entityClass={EntityClassMap.knowledgeLevelSeries}
          entityId={currentState.knowledgeLevelSeries?.id ?? null}
          labelPath={'name'}
          labelPlacement={'outside-left'}
          selectionCallback={interceptSeriesChange}
        />
      </div>
      <ControlledSelector<number, HasName & HasNumberId>
        aria-label={'Task Type'}
        entityClass={workTaskTypeName}
        entityId={currentState.workTaskTypeName?.id ?? null}
        label={'Task Type'}
        labelPath={'name'}
        selectionCallback={selectTaskType}
      />
      <ControlledSelector<number, CycleDto>
        aria-label={'Target Cycle'}
        entityClass={EntityClassMap.cycle}
        entityId={currentState.cycle?.id ?? null}
        label={'Target Cycle'}
        labelPath={'id'}
        selectionCallback={selectCycle}
      />
      <ConfirmActionModal
        changeDescription={klsLabel}
        changeDetails={
          <span>
            Changing {klsLabel} to{' '}
            <strong>{proposedUpdateRef.current?.name}</strong> will reset the
            creator.
          </span>
        }
        {...otherDisclosureProps}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmUpdate}
      />
    </div>
  );
}

export function ConfirmActionModal({
  changeDescription,
  changeDetails,
  onCancel,
  onConfirm,
  ...modalProps
}: {
  changeDescription: string;
  changeDetails: ReactNode;
} & ConfirmActionModalProps &
  Omit<ModalProps, 'children'>) {
  return (
    <Modal {...modalProps}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Confirm Change: {changeDescription}</ModalHeader>
            <ModalBody>{changeDetails}</ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  if (onCancel) {
                    onCancel();
                  }
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
