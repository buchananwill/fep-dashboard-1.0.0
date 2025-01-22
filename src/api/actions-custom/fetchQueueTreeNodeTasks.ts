'use server';

import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { QueueTreeNodeTaskDto } from '@/api/generated-types/generated-types_';

export async function fetchQueueTreeNodeTasks(
  queueTreeNodeId: number | undefined
) {
  if (queueTreeNodeId === undefined) {
    return null;
  } else {
    return getWithoutBody<QueueTreeNodeTaskDto[]>(
      constructUrl(
        `/api/v2/queue-tree-node-task?queueTreeNodeId=${queueTreeNodeId}`
      )
    );
  }
}
