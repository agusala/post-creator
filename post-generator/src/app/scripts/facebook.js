const FB = require('fb');

const appId = 'YOUR_APP_ID';
const appSecret = 'YOUR_APP_SECRET';
const accessToken = 'YOUR_ACCESS_TOKEN';

const graphAPI = new FB.GraphAPI({
  version: 'v13.0',
  appId: appId,
  appSecret: appSecret,
  accessToken: accessToken
});

// Ejemplo de consulta para obtener información del perfil del usuario actual
graphAPI.get('/me', (error, response) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(response);
});