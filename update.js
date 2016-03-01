var request = require('request-promise');

var redirectURI = 'http://localhost:2000/oauth2_callback';
var loginProvider = 'xtrac://localhost:2000';
var devsURL = 'http://localhost:3000/v1/developers/';
var appsURL = 'http://localhost:3000/v1/applications';
var oauthURL = 'http://localhost:3000/oauth2/token';
var portalClientId = 'e17bc7ff-4e3b-44a7-442f-54c9066a55a3';
var clientSecret = 'Wt7ynCfjIxhKjf7A65mKLyxNNXOjTIQVj7Kb+ToVPkM=';
var username = 'user';
var password = 'password';
var appClientID = 'd51d75db-9bf3-4097-4b46-71818348b1ee';

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
    }
  });
}

function printAT(body) {
  console.log("Access token", AT);
}

function extractAT(body) {
  parsed = JSON.parse(body);
  AT = parsed.access_token;
}

function retrieveApp() {
  var clientID = appClientID;
  console.log('App details for %s', clientID);
  return request({
    followAllRedirects: true,
    url:appsURL + '/' + clientID,
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + AT
    }
  });
}

function updateApp(r) {
  var updated = {
    applicationName:'sample dev app ok',
    developerEmail:'new@dev.com',
    redirectURI:redirectURI,
    loginProvider:loginProvider
  };

  updateUrl = appsURL + '/' + appClientID;
  console.log("send update to", updateUrl);
  return request({
    followAllRedirects: true,
    url: updateUrl,
    method: 'PUT',
    json: updated,
    headers: {
      'Authorization':'Bearer ' + AT
    }
  });
}

getPortalATPromise()
  .then(extractAT)
  .then(printAT)
  .then(updateApp)
  .then(retrieveApp)
  .then(function(r){
    console.log(r);
  })
  .catch(function(o) {
    console.log(o);
  });
