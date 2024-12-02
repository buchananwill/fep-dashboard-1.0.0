import { getWithoutBody } from '@/api/actions/template-actions';
import { API_V2_URL } from '@/api/literals';

export default async function Page() {
  const scheduleBom = await getWithoutBody(`${API_V2_URL}/schedule/bom/1`);

  return <pre>{JSON.stringify(scheduleBom, null, 2)}</pre>;
}
