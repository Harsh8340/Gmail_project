// intervalProcessor.js
const checkEmails = require('./emailChecker');
const replyToEmail = require('./emailResponder');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function startProcessing(auth) {
  setInterval(async () => {
    try {
      const emails = await checkEmails(auth);

      if (emails.length > 0) {
        for (const messageId of emails) {
          await replyToEmail(auth, messageId);
        }
      } else {
        console.log('No new emails to process.');
      }
    } catch (error) {
      console.error('Error processing emails:', error.message);
    }
  }, getRandomInt(45000, 120000));
}

module.exports = startProcessing;
