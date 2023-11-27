// emailChecker.js
const { google } = require('googleapis');

async function checkEmails(auth) {
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
    });

    const messages = response.data.messages;

    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        console.log('Email ID:', message.id);
      });

      return messages.map((message) => message.id);
    } else {
      console.log('No new emails found.');
      return [];
    }
  } catch (error) {
    console.error('Error checking emails:', error.message);
    throw error;
  }
}

module.exports = checkEmails;
