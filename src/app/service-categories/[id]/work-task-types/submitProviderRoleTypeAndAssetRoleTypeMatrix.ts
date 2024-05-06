'use server';
import { API_V2_URL, IntersectionGeneratorMatrix } from '@/api/main';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { WorkTaskTypeDto } from '@/app/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleTypeDto } from '@/app/api/dtos/ProviderRoleTypeDtoSchema';

interface AssetRoleTypeDto {
  name: string;
  id: number;
}

export async function submitProviderRoleTypeAndAssetRoleTypeMatrix(
  matrix: IntersectionGeneratorMatrix<WorkTaskTypeDto, any>
) {
  const urlProviderRoleTypes = `${API_V2_URL}/workTaskTypes/providerRoleTypeSuitabilities/generateFromIntersectionMatrix?validationTypeId=1`;
  const urlAssetRoleTypes = `${API_V2_URL}/workTaskTypes/assetRoleTypeSuitabilities/generateFromIntersectionMatrix?validationTypeId=1`;

  const providerRoleTypeNumbers = matrix.generatorMatrix.map((list) => [
    list[0]
  ]);
  const assetRoleTypeNumbers = matrix.generatorMatrix.map((list) => [list[1]]);

  const providerRoleTypeMatrix: IntersectionGeneratorMatrix<
    WorkTaskTypeDto,
    ProviderRoleTypeDto
  > = {
    rowReferenceList: matrix.rowReferenceList,
    generatorMatrix: providerRoleTypeNumbers,
    columnReferenceList: matrix.columnReferenceList[0]
  };
  const assetRoleTypeMatrix: IntersectionGeneratorMatrix<
    WorkTaskTypeDto,
    AssetRoleTypeDto
  > = {
    rowReferenceList: matrix.rowReferenceList,
    generatorMatrix: assetRoleTypeNumbers,
    columnReferenceList: matrix.columnReferenceList[1]
  };

  console.log('submitting...');

  const promiseProviders = postEntitiesWithDifferentReturnType(
    providerRoleTypeMatrix,
    urlProviderRoleTypes
  );
  const promiseAssets = postEntitiesWithDifferentReturnType(
    assetRoleTypeMatrix,
    urlAssetRoleTypes
  );

  return Promise.all([promiseProviders, promiseAssets]);
}
