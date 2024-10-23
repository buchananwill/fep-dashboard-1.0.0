import { QueueTreeNodeDto } from '@/api/generated-types/generated-types';
import { Chip, Modal, ModalProps } from '@mantine/core';
import { WorkProjectSeriesNodeLink } from '@/app/core/schedules/build-metrics/WorkProjectSeriesNodeLink';

export default function QueueTreeNodeModal({
  queueTreeNode,
  ...modalProps
}: { queueTreeNode?: QueueTreeNodeDto } & Pick<
  ModalProps,
  'opened' | 'onClose'
>) {
  if (!queueTreeNode) return null;

  return (
    <Modal {...modalProps}>
      <div>
        <h1 className="flex flex-col gap-1">
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
        </h1>
        <div>
          <div className={'grid max-h-[50vh] grid-cols-1 overflow-auto'}>
            {queueTreeNode.workProjectSeriesNodeLinks.map((nodeLink) => {
              return (
                <div key={nodeLink.id}>
                  <WorkProjectSeriesNodeLink nodeLink={nodeLink} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
