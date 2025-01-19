import { getUserGuide } from '@/app/user-guide/test';
import { ClientComponent } from '@/app/test/ClientComponent';

export default async function Page() {
  const userGuide = await getUserGuide();

  return <ClientComponent userGuide={userGuide} />;
}
