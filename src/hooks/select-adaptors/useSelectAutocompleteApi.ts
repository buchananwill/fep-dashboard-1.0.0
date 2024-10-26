import {
  AutocompleteApiParams,
  useAutocompleteApi
} from '@/hooks/select-adaptors/useAutocompleteApi';
import {
  SelectApiParamsSingleFlat,
  SingleFlat
} from '@/hooks/select-adaptors/selectApiTypes';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';

export function useSelectAutocompleteApi<T>({
  allowUndefined,
  ...initialParams
}: SelectApiParamsSingleFlat<T> &
  Pick<AutocompleteApiParams<T>, 'allowUndefined'>) {
  const selectApi = useSelectApi(initialParams) as SingleFlat;
  return useAutocompleteApi({
    ...selectApi,
    allowCustom: false,
    allowUndefined
  });
}
