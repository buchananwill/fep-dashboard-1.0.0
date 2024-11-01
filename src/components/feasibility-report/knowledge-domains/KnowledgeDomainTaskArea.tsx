import { TaskAreaPerKnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { getKnowledgeDomainResourceFlowResponse } from '@/api/actions-custom/feasibilities';
import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default async function KnowledgeDomainTaskArea({
  taskAreaPerKnowledgeDomainDto
}: {
  taskAreaPerKnowledgeDomainDto: TaskAreaPerKnowledgeDomainDto;
}) {
  const response = await getKnowledgeDomainResourceFlowResponse(
    taskAreaPerKnowledgeDomainDto.id
  );
  return (
    <tr className={clsx(response.outcome ? 'bg-emerald-100' : 'bg-zinc-100')}>
      <td className={'pr-2 text-right'}>
        {taskAreaPerKnowledgeDomainDto.shortCode}
      </td>
      <th className={'pl-2'}>{taskAreaPerKnowledgeDomainDto.name}</th>
      <td className={'text-right'}>{taskAreaPerKnowledgeDomainDto.taskArea}</td>
      <td className={'text-right'}>{response.flowAchieved}</td>
      <td className={'text-center'}>
        <span className={'center-horizontal-with-margin inline-block'}>
          {response.outcome ? (
            <CheckIcon className={'h-6 w-6 text-emerald-600'} />
          ) : (
            <XCircleIcon className={'h-6 w-6 text-red-600'} />
          )}
        </span>
      </td>
    </tr>
  );
}
