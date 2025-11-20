#!/bin/bash
cd /home/kavia/workspace/code-generation/teams-interaction-bot-67-76/teams_bot_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

