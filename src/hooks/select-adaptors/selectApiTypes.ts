import { LabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { SimpleSelectable } from '@/components/generic/MultiSelect';

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
  value: T;
  propagateChange: (selection: T | undefined) => void;
};
type SelectApiParamsMulti<T> = {
  value: T[];
  propagateChange: (selection: T[]) => void;
};
type SelectApiParamsSingleFlat<T> = SelectApiParamsSingle<T> &
  SelectApiParamsShared<T> & {
    type: 'singleFlat';
    valueMaker: never;
  };
type SelectApiParamsSingleObject<T> = SelectApiParamsSingle<T> &
  SelectApiParamsShared<T> & {
    type: 'singleObject';
    valueMaker?: LabelMaker<T>;
  };
type SelectApiParamsMultiFlat<T> = SelectApiParamsMulti<T> &
  SelectApiParamsShared<T> & {
    type: 'multiFlat';
    valueMaker: never;
  };
type SelectApiParamsMultiObject<T> = SelectApiParamsMulti<T> &
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

type SingleFlat = SelectFlatDataReturn &
  SingleSelectHandler & {
    type: 'singleFlat';
    value: string | null;
  };

type MultiFlat = MultiSelectHandler &
  SelectFlatDataReturn & {
    type: 'multiFlat';
    value: string[];
  };

type SingleObject = SelectObjectDataReturn &
  SingleSelectHandler & {
    type: 'singleObject';
    value: string | null;
  };

type MultiObject = SelectObjectDataReturn &
  MultiSelectHandler & {
    type: 'multiObject';
    value: string[];
  };
