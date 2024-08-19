import { FormSliderProps } from '@/components/react-hook-form/ControlledSlider';
import { FormInputProps } from '@/components/react-hook-form/ControlledInput';
import { FormSelectProps } from '@/components/react-hook-form/ControlledSelect';
import { Paths } from 'type-fest';

export type FormElementMapBase<T> = {
  [Property in Paths<T>]: FormElementTypes;
};

export type FormElementMap<T> = Partial<FormElementMapBase<T>>;

export type ControlledFormElementProps<T> =
  | ControlledInputElementProps
  | ControlledSliderElementProps
  | ControlledSelectElementProps;
type ControlledSliderElementProps = {
  elementType: 'Slider';
  innerProps: FormSliderProps;
};

type ControlledInputElementProps = {
  elementType: 'Input';
  innerProps: FormInputProps;
};

type ControlledSelectElementProps = {
  elementType: 'Select';
  innerProps: FormSelectProps;
};

type FormElementTypes = ControlledFormElementProps<any>['elementType'];
