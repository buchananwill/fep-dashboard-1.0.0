import { Api } from '@/api/clientApi_';
import { Chip } from '@nextui-org/chip';

export default async function OrganizationSummary({
  organizationId
}: {
  organizationId: number;
}) {
  const organizationDto = await Api.Organization.getOne(organizationId);

  return (
    <div className={'flex w-full items-center justify-around gap-2 p-1'}>
      <span className={'inline-block'}>{organizationDto.name}</span>
      <Chip>{organizationDto.type.name}</Chip>
    </div>
  );
}
