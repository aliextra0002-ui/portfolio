import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContactSubmission, readJsonBody } from './lib/contact.js';

function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const { status, body: responseBody } = await handleContactSubmission(body);

          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseBody));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  test: {
    environment: 'node',
  },
});
