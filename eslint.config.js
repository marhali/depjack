import eslintJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default typescriptEslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
  eslintJs.configs.recommended,
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintPluginVitest.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  eslintPluginPrettierRecommended,
);
