import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const reactResolve = require.resolve('react')
const reactDomResolve = require.resolve('react-dom')
const reactPkgDir = path.dirname(reactResolve)
const reactDomPkgDir = path.dirname(reactDomResolve)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // prevent Vite from trying to pre-bundle the JSX dev runtime which can fail
    exclude: ['react/jsx-dev-runtime', 'react/jsx-runtime'],
  },
  resolve: {
    alias: {
      // Force single React copy (helps prevent "Invalid hook call" in workspaces)
      react: reactPkgDir,
      // Force resolution for JSX runtime subpaths when 'react' is aliased to the package entry
      'react/jsx-runtime': path.join(reactPkgDir, 'jsx-runtime.js'),
      'react/jsx-dev-runtime': path.join(reactPkgDir, 'jsx-dev-runtime.js'),
      'react-dom': reactDomPkgDir,
      'react-dom/client': path.join(reactDomPkgDir, 'client.js'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
