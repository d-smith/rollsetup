var request = require('request-promise');
var q = require('q');

var redirectURI = 'http://localhost:2000/oauth2_callback';
var loginProvider = 'xtrac://localhost:2000';
var devsURL = 'http://localhost:3000/v1/developers/';
var appsURL = 'http://localhost:3000/v1/applications';
var oauthURL = 'http://localhost:3000/oauth2/token';
var portalClientId = '7d8801d5-154c-460b-5206-48e4485e99ff';
var clientSecret = 'iZm+Uahj6ImDT+/dvGK52KHSnstbhdU47TieZacZ6jY=';
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
    }
  });
}


function printAT(body) {
  parsed = JSON.parse(body);
  console.log(parsed.access_token)
}

function extractAT(body) {
  parsed = JSON.parse(body);
  AT = parsed.access_token;
}

function createDev(ATBody) {
  //var parsed = JSON.parse(ATBody);
  //var accessToken = parsed.access_token;

  var portalDev = {
    email:'new@dev.com',
    firstName:'New',
    lastName:'Dev'
  };

  //AT = accessToken;

  return request({
    followAllRedirects: true,
    url: devsURL + 'new@dev.com',
    method: 'PUT',
    json: portalDev,
    headers: {
      'Authorization':'Bearer ' + AT
    }
  });
}


function createApp() {
  var portalApp = {
    applicationName:'sample dev app',
    developerEmail:'new@dev.com',
    redirectURI:redirectURI,
    loginProvider:loginProvider
  };

  return request({
    followAllRedirects: true,
    url: appsURL,
    method: 'POST',
    json: portalApp,
    headers: {
      'Authorization':'Bearer ' + AT
    }
  });
}

function retrieveApp(createResp) {
  var clientID = createResp.client_id;
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

getPortalATPromise()
  .then(extractAT)
  .then(createDev)
  .then(createApp)
  .then(retrieveApp)
  .then(function(r){
    console.log(r);
  })
  .catch(function(o) {
    console.log(o);
  });
