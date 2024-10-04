import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import CreateWorkTaskType from '@/components/work-task-types/CreateWorkTaskType';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function CreateWorkTaskTypeWithAuth(
  props: LeafComponentProps
) {
  const session = await auth();

  if (!session) notFound();

  return <CreateWorkTaskType {...props} />;
}
