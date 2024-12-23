import { FlatCompat } from '@eslint/eslintrc';
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier']
  })
];

const tsConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended
);

export default [...eslintConfig, ...tsConfig];
