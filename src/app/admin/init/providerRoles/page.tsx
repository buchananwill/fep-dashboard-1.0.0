import { constructUrl } from '@/api/actions/template-base-endpoints';
import GeneratorButton from '@/app/admin/init/providerRoles/GeneratorButton';

export default async function page() {
  const url = constructUrl('/api/v2/generate/providerRoles');

  return <GeneratorButton url={url} />;
}
