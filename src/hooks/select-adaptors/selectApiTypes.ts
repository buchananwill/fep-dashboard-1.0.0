import { LabelMaker } from '@/hooks/select-adaptors/useLabelMaker';

import { SimpleSelectable } from '@/components/types/types';

export type SelectApiReturn =
  | SingleFlat
  | MultiFlat
  | SingleObject
  | MultiObject;
type SelectApiParamsShared<T> = {
  rawData: T[];
  labelMaker: LabelMaker<T>;
};
type SelectApiParamsSingle<T> = {
  value?: T;
  propagateChange: (selection: T | undefined) => void;
};
type SelectApiParamsMulti<T> = {
  value: T[];
  propagateChange: (selection: T[]) => void;
};
export type SelectApiParamsSingleFlat<T> = SelectApiParamsSingle<T> &
  SelectApiParamsShared<T> & {
    type: 'singleFlat';
    valueMaker?: never;
  };
export type SelectApiParamsSingleObject<T> = SelectApiParamsSingle<T> &
  SelectApiParamsShared<T> & {
    type: 'singleObject';
    valueMaker?: LabelMaker<T>;
  };
export type SelectApiParamsMultiFlat<T> = SelectApiParamsMulti<T> &
  SelectApiParamsShared<T> & {
    type: 'multiFlat';
    valueMaker?: never;
  };
export type SelectApiParamsMultiObject<T> = SelectApiParamsMulti<T> &
  SelectApiParamsShared<T> & {
    type: 'multiObject';
    valueMaker?: LabelMaker<T>;
  };
export type SelectApiParams<T> =
  | SelectApiParamsSingleFlat<T>
  | SelectApiParamsSingleObject<T>
  | SelectApiParamsMultiFlat<T>
  | SelectApiParamsMultiObject<T>;

type SelectFlatDataReturn = {
  data: string[];
};

type SelectObjectDataReturn = {
  data: SimpleSelectable[];
};

type SingleSelectHandler = {
  onChange: (value: string | null) => void;
};

type MultiSelectHandler = {
  onChange: (value: string | string[] | null) => void;
};

export type SingleFlat = SelectFlatDataReturn &
  SingleSelectHandler & {
    type: 'singleFlat';
    value: string | null;
  };

export type MultiFlat = MultiSelectHandler &
  SelectFlatDataReturn & {
    type: 'multiFlat';
    value: string[];
  };

export type SingleObject = SelectObjectDataReturn &
  SingleSelectHandler & {
    type: 'singleObject';
    value: string | null;
  };

export type MultiObject = SelectObjectDataReturn &
  MultiSelectHandler & {
    type: 'multiObject';
    value: string[];
  };
