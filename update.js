var request = require('request-promise');
var rollutil = require('./rollutil');

var appsURL = 'http://localhost:3000/v1/applications';
var username = 'user';
var password = 'password';
var appClientID = '3d3ae096-6184-488d-4c92-f3e6e74a8ca6';
var redirectURI = 'http://localhost:2000/oauth2_callback';
var loginProvider = 'xtrac://localhost:2000'

var AT = '';

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

rollutil.getPortalATPromise(username, password, false)
  .then(rollutil.extractAT)
  .then(function(at){
    AT = at;
  })
  .then(updateApp)
  .then(retrieveApp)
  .then(function(r){
    console.log(r);
  })
  .catch(function(o) {
    console.log(o);
  });
