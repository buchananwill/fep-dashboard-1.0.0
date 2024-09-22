import { AssetDto } from '@/api/generated-types/generated-types';
import React from 'react';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { BaseEntity } from '@/components/roles/create-role/PersonNestedInForm';
import ControlledSwitch from '@/components/react-hook-form/ControlledSwitch';

const AssetInput = ControlledInput<BaseEntity<AssetDto>>;
const AssetSwitch = ControlledSwitch<BaseEntity<AssetDto>>;

export function AssetNestedInForm() {
  return (
    <>
      <h1>Asset</h1>
      <AssetInput
        name={'baseEntity.name'}
        aria-label={'Name'}
        label={'Name'}
        placeholder={'Enter name'}
        autoComplete={'on'}
      />
      <AssetInput
        name={'baseEntity.type.name'}
        aria-label={'Type Name'}
        label={'Type Name'}
        placeholder={'Enter type name'}
        autoComplete={'on'}
      />
      <div
        className={
          'flex w-full items-center justify-center gap-2 text-sm text-default-600'
        }
      >
        Is Moveable
        <AssetSwitch
          name={'baseEntity.type.isMoveable'}
          aria-label={'Is Moveable'}
        ></AssetSwitch>
      </div>
    </>
  );
}
