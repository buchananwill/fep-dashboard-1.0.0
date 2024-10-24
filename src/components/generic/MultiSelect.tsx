import { useState } from 'react';
import Select, { OnChangeValue } from 'react-select';

export interface SimpleSelectable {
  label: string;
  value: string;
}
