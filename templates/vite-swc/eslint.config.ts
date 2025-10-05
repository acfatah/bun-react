import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // Ensure the TypeScript parser picks the correct tsconfig when multiple workspaces exist
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      // https://github.com/schoero/eslint-plugin-better-tailwindcss
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
      },
    },
  },
])
