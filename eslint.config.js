import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
