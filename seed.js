var http = require('http');

//Set the following variables to seed a dev and app for the portal itself
var admin = 'portal-admin';
var host = 'localhost';
var port = 3000;
var devEmail = 'test@dev.com';
var appName = 'dev portal'
var redirectURI = 'http://localhost:2000/oauth2_callback';
var loginProvider = 'xtrac://localhost:2000';


function createPortalDev() {
  var portalDev = {
    email:devEmail,
    firstName:'Doug',
    lastName:'Dev'
  };

  var options = {
    headers: {
      'X-Roll-Subject':admin
    },
    host: host,
    port: port,
    path: '/v1/developers/' + devEmail,
    method: 'PUT'
  } ;

  var req = http.request(options, function(res){
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(JSON.stringify(portalDev));
  req.end();

}

function createDevPortalApp() {
  var portalApp = {
    applicationName:appName,
    developerEmail:devEmail,
    redirectURI:redirectURI,
    loginProvider:loginProvider
  };

  var options = {
    headers: {
      'X-Roll-Subject':admin
    },
    host: host,
    port: port,
    path: '/v1/applications',
    method: 'POST'
  } ;

  var req = http.request(options, function(res){
    var respdata = '';

    res.on('data', function (chunk) {
      respdata += chunk;
    });

    res.on('end', function(){
      var respobj = JSON.parse(respdata);
      console.log('export ROLL_CLIENTID=%s',respobj['client_id']);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(JSON.stringify(portalApp));
  req.end();
}

createPortalDev();
createDevPortalApp();
