// auth.js
const { google } = require('googleapis');
const fs = require('fs').promises;

async function authenticate(apiKey = null) {
  if (!apiKey) {
    apiKey = await promptApiKey();
  }

  
  const filePath = "C:\gmail-api\gmail-autoresponder\my-project-1-406213-2785d73ea696.json";
  let credentials;
  try {
    credentials = await fs.readFile(filePath);
    console.log('File content:', credentials);
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }

  let credentialsObject;
  try {
    credentialsObject = JSON.parse(credentials);
    console.log('Parsed JSON:', credentialsObject);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    throw error;
  }

  const { client_secret, client_id, redirect_uris, private_key } = credentialsObject;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Use the provided API key for authentication
  oAuth2Client.setCredentials({ access_token: apiKey, private_key });

  return oAuth2Client;
}

async function promptApiKey() {
  const readlineSync = require('readline-sync');
  const apiKey = readlineSync.question('AIzaSyCEnyQtJ1weslcqLOxd93r_ejzmihNAGo8 ');

  return apiKey;
}

module.exports = authenticate;
