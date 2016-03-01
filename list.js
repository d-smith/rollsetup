var request = require('request-promise');

var appsURL = 'http://localhost:3000/v1/applications';
var oauthURL = 'http://localhost:3000/oauth2/token';
var portalClientId = 'e17bc7ff-4e3b-44a7-442f-54c9066a55a3';
var clientSecret = 'Wt7ynCfjIxhKjf7A65mKLyxNNXOjTIQVj7Kb+ToVPkM=';
var username = 'user';
var password = 'password';

var AT = '';

function getPortalATPromise() {
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
      scope:'admin',
    }
  });
}

function extractAT(body) {
  parsed = JSON.parse(body);
  AT = parsed.access_token;
}

function retrieveApps() {
  return request({
    followAllRedirects: true,
    url:appsURL,
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + AT
    }
  });
}

getPortalATPromise()
  .then(extractAT)
  .then(retrieveApps)
  .then(function(r){
    console.log(r);
  })
  .catch(function(o) {
    console.log(o);
  });
