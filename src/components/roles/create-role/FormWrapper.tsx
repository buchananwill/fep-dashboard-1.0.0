'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { AssetDto } from '@/api/generated-types/generated-types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AssetRolePostRequestSchema,
  ProviderRolePostRequestSchema
} from '@/api/RolePostRequestSchemas';
import { defaultPersonValues } from '@/components/roles/CreatePersonForm';
import { FieldValues } from 'react-hook-form/dist/types';
import CreateRoleForm, {
  RoleFormProps
} from '@/components/roles/create-role/CreateRoleForm';

export default function FormWrapper<T extends FieldValues>(
  props: RoleFormProps<T>
) {
  const { roleEntity } = props;
  const Schema =
    roleEntity === 'asset'
      ? AssetRolePostRequestSchema
      : ProviderRolePostRequestSchema;
  const methods = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      baseEntity:
        roleEntity === 'asset' ? defaultAssetValues : defaultPersonValues,
      suitabilities: [],
      availabilities: []
    }
  });

  return (
    <FormProvider {...methods}>
      <CreateRoleForm {...props} />
    </FormProvider>
  );
}
const defaultAssetValues: AssetDto = {
  name: '',
  id: -1,
  type: {
    name: '',
    id: -1,
    isMoveable: false
  }
};
