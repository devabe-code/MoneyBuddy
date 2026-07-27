import express from 'express';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (_request, response) => {
    response.json({
      service: 'moneybuddy-api',
      status: 'ok',
    });
  });

  return app;
}
