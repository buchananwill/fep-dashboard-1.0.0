import { Api } from '@/api/clientApi';
import { AssetRoleRequestsTablePage } from '@/components/init-json-template/asset-role-requests/AssetRoleRequestsTable';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(19);

  return <AssetRoleRequestsTablePage initJsonTemplate={newVar} />;
}
