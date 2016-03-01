var request = require('request-promise');
var rollutil = require('./rollutil');

var redirectURI = 'http://localhost:2000/oauth2_callback';
var loginProvider = 'xtrac://localhost:2000';
var devsURL = 'http://localhost:3000/v1/developers/';
var appsURL = 'http://localhost:3000/v1/applications';
var username = 'user';
var password = 'password';

var AT = '';



function createDev(ATBody) {

  var portalDev = {
    email:'new@dev.com',
    firstName:'New',
    lastName:'Dev'
  };

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

rollutil.getPortalATPromise(username,password,false)
  .then(rollutil.extractAT)
  .then(function(at){
    AT = at;
  })
  .then(createDev)
  .then(createApp)
  .then(retrieveApp)
  .then(function(r){
    console.log(r);
    console.log("Try out:")
    app = JSON.parse(r)
    console.log("http://localhost:3000/oauth2/authorize?client_id=" +
      app.clientID + "&response_type=token&redirect_uri=http://localhost:2000/oauth2_callback"
    )

  })
  .catch(function(o) {
    console.log(o);
  });
