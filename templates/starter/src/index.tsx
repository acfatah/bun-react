import { serve } from 'bun'
import process from 'node:process'
import index from './index.html'

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      async GET(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        })
      },
      async PUT(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        })
      },
    },

    '/api/hello/:name': async (_req) => {
      const name = _req.params.name

      return Response.json({
        message: `Hello, ${name}!`,
      })
    },
  },
  development: process.env.NODE_ENV !== 'production'
    ? {
        // Enable browser hot reloading in development
        hmr: true,

        // Echo console logs from the browser to the server
        console: true,
      }
    : undefined,
})

console.warn(`🚀 Server running at ${server.url}`)
