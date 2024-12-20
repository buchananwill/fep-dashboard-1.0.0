import { Api } from '@/api/clientApi';
import {
  PersonDto,
  RolePostRequest
} from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { IdWrapper } from '@/api/types';
import { ProviderRolePostRequestTable } from '@/components/tables/edit-tables/ProviderRolePostRequestTable';

export default async function Page() {
  const initJsonTemplate = await Api.InitJsonTemplate.getOne(18);
}
