// emailResponder.js
const { google } = require('googleapis');

async function replyToEmail(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
    });

    const email = response.data;
    
    if (email) {
      const hasPriorReplies = email.threadId ? true : false;

      if (hasPriorReplies) {
        console.log('Email has prior replies. Do not reply again.');
        return;
      }

      console.log('Sending a reply...');

      console.log('Adding label and moving the email...');
    }
  } catch (error) {
    console.error('Error replying to email:', error.message);
    throw error;
  }
}

module.exports = replyToEmail;
