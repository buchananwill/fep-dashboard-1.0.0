import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps
} from '@nextui-org/modal';
import { QueueTreeNodeDto } from '@/api/generated-types/generated-types';
import { renderQueueTreeNodeEntry } from '@/app/core/scheduling/build-metrics/BuildMetricTable';
import { Button } from '@nextui-org/button';
import { WorkProjectSeriesNodeLink } from '@/app/core/scheduling/build-metrics/WorkProjectSeriesNodeLink';
import { Chip } from '@nextui-org/chip';

export default function QueueTreeNodeModal({
  queueTreeNode,
  ...modalProps
}: { queueTreeNode?: QueueTreeNodeDto } & Omit<ModalProps, 'children'>) {
  if (!queueTreeNode) return null;
  return (
    <Modal {...modalProps}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div>Queue Tree Node: {queueTreeNode.nodeNumber}</div>
          <div className={'flex justify-between'}>
            <div>
              task size:
              <Chip color={'primary'}>{queueTreeNode.taskSize}</Chip>
            </div>
            <div>
              net failure count:{' '}
              <Chip color={'danger'}>{queueTreeNode.netFailureCount}</Chip>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className={'grid max-h-[50vh] grid-cols-1 overflow-auto'}>
            {queueTreeNode.workProjectSeriesNodeLinks.map((nodeLink) => {
              return (
                <div key={nodeLink.id}>
                  <WorkProjectSeriesNodeLink nodeLink={nodeLink} />
                </div>
              );
            })}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
