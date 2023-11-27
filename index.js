// index.js
const authenticate = require('./auth');
const startProcessing = require('./intervalProcessor');

(async () => {
  try {
    const apiKey = await promptApiKey(); 
    const auth = await authenticate(apiKey);
    startProcessing(auth);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

async function promptApiKey() {
  const readlineSync = require('readline-sync');
  const apiKey = readlineSync.question('AIzaSyCEnyQtJ1weslcqLOxd93r_ejzmihNAGo8');

  return apiKey;
}
