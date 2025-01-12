'use client';
import { QueueTreeNodeDto } from '@/api/generated-types/generated-types_';
import { Modal, ModalProps } from '@mantine/core';
import { QueueTreeNodeTask } from '@/app/core/schedules/build-metrics/QueueTreeNodeTask';
import { useGlobalDispatch } from 'selective-context';
import { NodeInModal } from '@/app/core/schedules/build-metrics/BuildMetricTable';
import { SetOptional } from 'type-fest';
import clsx from 'clsx';

export default function QueueTreeNodeModal({
  queueTreeNode,
  onClose,
  ...modalProps
}: { queueTreeNode?: QueueTreeNodeDto } & SetOptional<
  Pick<ModalProps, 'opened' | 'onClose'>,
  'onClose'
>) {
  const { dispatchWithoutListen } = useGlobalDispatch<
    QueueTreeNodeDto | undefined
  >(NodeInModal);

  if (!queueTreeNode) return null;

  return (
    <Modal
      {...modalProps}
      onClose={() => {
        dispatchWithoutListen(undefined);
        onClose && onClose();
      }}
    >
      <div>
        <h1 className="flex flex-col gap-1">
          <div>Queue Tree Node: {queueTreeNode.nodeNumber}</div>
          <div className={'flex justify-between'}>
            <div>
              task size:
              <div
                className={
                  'inline-block w-fit rounded-md bg-zinc-200 px-2 text-right'
                }
              >
                {queueTreeNode.taskSize}
              </div>
            </div>
            <div>
              net failure count:
              <div
                className={clsx(
                  queueTreeNode.netFailureCount > 0
                    ? 'bg-red-200'
                    : 'bg-emerald-200',
                  'inline-block w-fit rounded-md px-2'
                )}
              >
                {queueTreeNode.netFailureCount}
              </div>
            </div>
          </div>
        </h1>
        <div>
          <div className={'grid max-h-[50vh] grid-cols-1 overflow-auto'}>
            {queueTreeNode.queueTreeNodeTaskDtos.map((task) => {
              return (
                <div key={task.id}>
                  <QueueTreeNodeTask nodeTask={task} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
