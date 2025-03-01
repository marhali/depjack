import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default typescriptEslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
  eslintJs.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
  eslintPluginImport.flatConfigs.recommended,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig*(.*).json',
        },
        node: true,
      },
    },
  },
  typescriptEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    files: ['*.test.*'],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      vitest: eslintPluginVitest,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...eslintPluginVitest.configs.recommended.rules,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  eslintPluginPrettierRecommended,
);
