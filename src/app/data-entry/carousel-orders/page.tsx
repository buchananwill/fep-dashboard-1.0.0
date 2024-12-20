import { Api } from '@/api/clientApi';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(17);
}
