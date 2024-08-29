import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default typescriptEslint.config(
  { ignores: ['dist'] },
  {
    extends: [eslintJs.configs.recommended, ...typescriptEslint.configs.recommendedTypeChecked],
    files: ['**/*.{ts}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    plugins: [eslintPluginVitest],
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
    },
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
);
