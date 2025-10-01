import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    react: true,
  },

  {
    rules: {
      'no-console': 'off',

      // FIXME: Temporary disable these rules
      // Antfu's config injects React rules referencing the plugin name 'react'
      // which maps to @eslint-react packages rather than the classic 'eslint-plugin-react'.
      // That caused ESLint to look for 'react/no-comment-textnodes' in the classic
      // plugin but Antfu expects @eslint-react.
      'react/no-comment-textnodes': 'off',
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',
      'react-hooks-extra/prefer-use-state-lazy-initialization': 'off',

      // https://perfectionist.dev/rules/sort-imports.html
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],

      // https://eslint.style/rules/space-before-function-paren
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
        // catch: 'never',
      }],

      // https://eslint.style/rules/padding-line-between-statements
      'style/padding-line-between-statements': [
        'error',
        // require blank line before all return statements
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/logs',
      '**/upload',
      'tsconfig.*',
      'templates/*/tsconfig.*',
    ],
  },
)
