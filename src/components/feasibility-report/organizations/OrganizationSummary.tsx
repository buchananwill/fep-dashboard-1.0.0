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
      <td className={'text-right text-xs italic'}>
        {organizationDto.type.name}
      </td>
    </tr>
  );
}
