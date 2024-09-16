import { LeafComponentProps } from '@/app/core/navigation/types';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import CreateWorkTaskType from '@/components/work-task-types/CreateWorkTaskType';

export default async function CreateWorkTaskTypeWithAuth(
  props: LeafComponentProps
) {
  const session = await auth();

  if (!session) notFound();

  return <CreateWorkTaskType {...props} />;
}
