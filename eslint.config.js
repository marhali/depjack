// @ts-check

import globals from 'globals';
import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

const project = ['tsconfig.base.json', './packages/*/tsconfig.json', './examples/*/tsconfig.json'];

export default defineConfig(
  globalIgnores(['**/dist']),
  eslintJs.configs.recommended,
  typescriptEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [eslintPluginImport.flatConfigs.recommended, eslintPluginImport.flatConfigs.typescript],
    settings: {
      'import/resolver': {
        node: true,
        typescript: {
          project,
        },
      },
    },
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    files: ['**/*.test.*'],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
    },
  },
  eslintPluginPrettierRecommended,
);
