var request = require('request-promise');

var oauthURL = 'http://localhost:3000/oauth2/token';
var portalClientId = '34e43f0a-87de-4793-52c9-bdd51824f05c';
var clientSecret = 'A0NjgL77lUjpDMQnTWsBilEBJv5saNIuHyMXN+KL10g=';

module.exports = {
  extractAT: function(body) {
    parsed = JSON.parse(body);
    return parsed.access_token;
  },

  getPortalATPromise: function(username, password, adminScope) {
    var accessScope = ''
    if(adminScope == true) {
      accessScope = 'admin';
    }

    return request({
      followAllRedirects: true,
      url: oauthURL,
      method: 'POST',
      form: {
        client_id:portalClientId,
        grant_type:'password',
        client_secret: clientSecret,
        username: username,
        password: password,
        scope:accessScope,
      }
    });
  }
}
