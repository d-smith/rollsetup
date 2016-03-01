var request = require('request-promise');
var rollutil = require('./rollutil');

var appsURL = 'http://localhost:3000/v1/applications';

var AT = '';

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

rollutil.getPortalATPromise('user', 'password', false)
  .then(rollutil.extractAT)
  .then(function(at) {
    AT = at;
  })
  .then(retrieveApps)
  .then(function(r){
    console.log(r);
  })
  .catch(function(o) {
    console.log(o);
  });
