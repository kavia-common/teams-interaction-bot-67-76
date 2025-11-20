# Backend Bot Service (Echo Bot)

A minimal Microsoft Bot Framework Echo Bot built with Node.js and Express. It exposes:
- `GET /healthz` for health checks
- `POST /api/messages` for Bot Framework activities

This service can run with or without Microsoft credentials. If `MicrosoftAppId` and `MicrosoftAppPassword` are not set, it runs without auth, which is ideal for local testing with the Bot Framework Emulator.

## Prerequisites

- Node.js v16+ (recommend v18+)
- [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator/releases)

## Quick Start

1. Open a terminal in this folder:

   ```bash
   cd teams-interaction-bot-67-76/backend_bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:

   - Copy `.env.example` to `.env` and set values as needed.

   ```bash
   cp .env.example .env
   # edit .env to set MicrosoftAppId and MicrosoftAppPassword if you want auth
   ```

   - For local testing without auth, you may leave `MicrosoftAppId` and `MicrosoftAppPassword` empty.

4. Start the bot:

   ```bash
   npm start
   ```

5. Verify health:

   - Open http://localhost:3978/healthz (or your configured `PORT`)

## Connect using Bot Framework Emulator

1. Launch the Bot Framework Emulator.
2. Click "Open Bot".
3. Enter the bot URL:

   ```
   http://localhost:3978/api/messages
   ```

4. If running without credentials, leave the Microsoft App ID and Password fields empty and connect.
5. Send any message to the bot and it will echo: `Echo: <your message>`.

## Using Credentials (Optional)

If you have an existing Azure App Registration for your bot:

- Set the following in your `.env`:

  ```
  MicrosoftAppId=<your-app-id>
  MicrosoftAppPassword=<your-app-password>
  ```

- Restart the bot (`npm start`). The console will indicate that bot authentication is enabled.
- In the Emulator open dialog, provide the same App ID and Password.

## Scripts

- `npm start` - Runs the bot using `node index.js`
- `npm run dev` - Runs the bot with `nodemon` for auto-reload during development

## Endpoints

- `GET /healthz` - Returns a simple JSON status
- `POST /api/messages` - Bot Framework endpoint for messages

## Notes

- This backend runs independently from the React frontend. No changes to the frontend are required to use the Emulator.
- Default port is `3978`. Modify `PORT` in `.env` to change it.

## License

MIT
