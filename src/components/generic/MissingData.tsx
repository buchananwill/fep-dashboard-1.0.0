import { Card } from '@nextui-org/card';
import { ActionResponse } from '@/api/actions/actionResponse';

export function MissingData({ response }: { response?: ActionResponse<any> }) {
  return <Card>{response ? response.message : 'Missing data'}</Card>;
}
