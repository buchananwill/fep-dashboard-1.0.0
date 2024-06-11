import { ProviderRoleApi, ProviderRoleSuitabilityApi } from '@/api/clientApi';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { DtoStoreNumberInputWrapper } from '@/components/generic/DtoStoreNumberInput';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';

export default async function page() {
  const one = await ProviderRoleSuitabilityApi.getOne(1);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        dtoList={[one]}
      />
      <DtoStoreNumberInputWrapper<ProviderRoleTypeWorkTaskTypeSuitabilityDto>
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        entityId={1}
        numberKey={'rating'}
        min={0}
        allowFloat={true}
      />
    </>
  );
}
