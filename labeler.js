// labeler.js
const { google } = require('googleapis');

async function addLabel(auth, messageId, labelName) {
  const gmail = google.gmail({ version: 'v1', auth });

  const labelsResponse = await gmail.users.labels.list({ userId: 'me' });
  const label = labelsResponse.data.labels.find((l) => l.name === labelName);
  if (!label) {
    await gmail.users.labels.create({
      userId: 'me',
      resource: { name: labelName },
    });
  }
  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    resource: { addLabelIds: [labelName] },
  });
}

module.exports = addLabel;
