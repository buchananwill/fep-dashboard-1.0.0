import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import CreateWorkType from '@/components/work-types/CreateWorkType';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

export default async function CreateWorkTypeWithAuth(
  props: LeafComponentProps
) {
  const session = await auth();

  if (!session) notFound();

  return <CreateWorkType {...props} />;
}
