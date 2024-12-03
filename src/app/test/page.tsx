import { Api } from '@/api/clientApi';
import { WpssTransferList } from '@/app/test/WpssTransferList';

export default async function Page() {
  const workProjectSeriesSchemaDtos =
    await Api.WorkProjectSeriesSchema.getAll();

  return <WpssTransferList dtoList={workProjectSeriesSchemaDtos} />;
}
