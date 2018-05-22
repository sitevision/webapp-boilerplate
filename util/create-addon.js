//Uncomment when using self-signed or otherwise incorrect certificates
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var
   request       = require('request'),
   properties    = require('../util/properties'),
   queryString   = require('querystring');

(function () {
   var props = properties.getDevProperties(),
      url = `https://${props.username}:${props.password}@${props.domain}/rest-api/1/0/${queryString.escape(props.siteName)}/Addon%20Repository/custommodule`;

   request.post({url: url, form: {name: props.addonName, category: 'Other'}}, (err, httpResponse, body) => {
      if (err) {
         return console.error('Addon creation failed:', err);
      }

      if (httpResponse.statusCode === 200) {
         return console.log('Addon creation successful: \n', JSON.stringify(JSON.parse(body), null, 2));
      }

      console.log('Addon creation failed: \n', JSON.stringify(JSON.parse(body), null, 2));
   });
})();
