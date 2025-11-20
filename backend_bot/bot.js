'use strict';

const { ActivityHandler, MessageFactory } = require('botbuilder');

/**
 * EchoBot is a minimal bot that echoes any text sent by the user.
 */
class EchoBot extends ActivityHandler {
  constructor() {
    super();

    // Handle incoming message activities
    this.onMessage(async (context, next) => {
      const userText = (context.activity && context.activity.text) ? context.activity.text.trim() : '';
      const replyText = userText ? `Echo: ${userText}` : 'Echo: (no text received)';
      await context.sendActivity(MessageFactory.text(replyText));
      await next();
    });

    // Handle conversation update activities (e.g., when the bot joins)
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded || [];
      for (const member of membersAdded) {
        // Greet only users (ignore the bot itself)
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity('Hello! I am an Echo Bot. Send me a message and I will echo it back.');
        }
      }
      await next();
    });
  }

  // PUBLIC_INTERFACE
  async run(context) {
    /**
     * Run the bot's turn handler pipeline for a given turn context.
     * @param {TurnContext} context - The turn context representing the incoming Activity.
     * @returns {Promise<void>} Resolves when the turn has been processed.
     */
    await super.run(context);
  }
}

module.exports = { EchoBot };
