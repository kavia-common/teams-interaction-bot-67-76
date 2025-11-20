'use strict';

/**
 * Entry point for the Bot Framework Echo Bot service.
 * - Loads environment variables using dotenv.
 * - Configures BotFrameworkAdapter with MicrosoftAppId and MicrosoftAppPassword when provided.
 * - Exposes:
 *   - GET /healthz for simple health checks
 *   - POST /api/messages for Bot Framework activities
 * - Logs startup information and whether authentication is enabled.
 */

const express = require('express');
const morgan = require('morgan');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot');

// Load environment variables from .env (if present)
require('dotenv').config();

// Configuration via environment variables
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3978;
const MicrosoftAppId = process.env.MicrosoftAppId || process.env.MICROSOFT_APP_ID || '';
const MicrosoftAppPassword = process.env.MicrosoftAppPassword || process.env.MICROSOFT_APP_PASSWORD || '';

// Create the Express app
const app = express();

// Logging middleware
app.use(morgan('dev'));

// Health endpoint
app.get('/healthz', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'backend_bot',
    port: PORT,
    authEnabled: Boolean(MicrosoftAppId && MicrosoftAppPassword)
  });
});

// Configure the BotFramework Adapter
// If MicrosoftAppId/Password are empty, the adapter will run without auth for local Emulator testing.
const adapter = new BotFrameworkAdapter({
  appId: MicrosoftAppId || undefined,
  appPassword: MicrosoftAppPassword || undefined
});

// Catch-all for adapter errors
adapter.onTurnError = async (context, error) => {
  // Log any leaked errors from the application.
  console.error('[onTurnError] unhandled error:', error);

  // Send a message to the user
  await context.sendActivity('The bot encountered an error or bug.');
  await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Create the bot instance
const bot = new EchoBot();

// Body parser is handled internally by adapter for /api/messages, so no need to add express.json() for that route.
// However, using express.json() globally is safe; adapter reads raw body from req after this as well.
app.use(express.json());

// PUBLIC_INTERFACE
app.post(
  '/api/messages',
  /**
   * Handle incoming Activities from Bot Framework channels/Emulator.
   */
  (req, res) => {
    adapter.processActivity(req, res, async (context) => {
      // Route the message to the bot's main handler.
      await bot.run(context);
    });
  }
);

// Start the server
app.listen(PORT, () => {
  const authNote = (MicrosoftAppId && MicrosoftAppPassword)
    ? 'Bot authentication ENABLED (using MicrosoftAppId and MicrosoftAppPassword).'
    : 'Bot authentication DISABLED (no credentials provided) - suitable for local Emulator without auth.';
  console.log('===================================================');
  console.log('Microsoft Bot Framework Echo Bot is running.');
  console.log(`Health check:        GET  http://localhost:${PORT}/healthz`);
  console.log(`Bot messages route:  POST http://localhost:${PORT}/api/messages`);
  console.log(authNote);
  console.log('Open Bot Framework Emulator and connect to the above /api/messages endpoint.');
  console.log('===================================================');
});
