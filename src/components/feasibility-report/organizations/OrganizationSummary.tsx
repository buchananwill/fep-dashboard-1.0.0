import { Api } from '@/api/clientApi_';

export default async function OrganizationSummary({
  organizationId
}: {
  organizationId: number;
}) {
  const organizationDto = await Api.Organization.getOne(organizationId);

  return (
    <tr className={'border-b-1'}>
      <th colSpan={2} scope={'rowgroup'} className={'text-right'}>
        {organizationDto.name}
      </th>
      <th className={'text-right'}>{organizationDto.type.name}</th>
    </tr>
  );
}
