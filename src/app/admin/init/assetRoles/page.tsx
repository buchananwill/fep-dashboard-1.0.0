import { constructUrl } from '@/api/actions/template-base-endpoints';
import { bulkPipeline } from '@/utils/init-object-literals/assetRoleBulkRequest';
import GenerateOneButton from '@/app/admin/init/providerRoles/GenerateOneButton';

const url = constructUrl('/api/v2/generate/assetRoles');

export default async function page() {
  return (
    <div className={'grid grid-cols-6 gap-4 p-4'}>
      {bulkPipeline.map((requestItem, index) => (
        <GenerateOneButton key={index} url={url} requestData={requestItem} />
      ))}
    </div>
  );
}
