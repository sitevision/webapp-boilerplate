//Uncomment when using self-signed or otherwise incorrect certificates
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var
   fs            = require('fs'),
   request       = require('request'),
   properties    = require('../util/properties'),
   queryString   = require('querystring');

(function () {
   var props = properties.getDevProperties(),
      url = `https://${encodeURIComponent(props.username)}:${encodeURIComponent(props.password)}@${props.domain}/rest-api/1/0/${queryString.escape(props.siteName)}/Addon%20Repository/${props.addonName}/webAppImport`,
      manifest = properties.getManifest(),
      formData = {
         file: fs.createReadStream(properties.DIST_DIR_PATH + '/' + manifest.id + '.zip')
      };

   if (process.argv[2] === 'force') {
      url += '?force=true';
   }

   request.post({url: url, formData: formData}, (err, httpResponse, body) => {
      if (err) {
         return console.error('\x1b[31mUpload failed:\x1b[0m', err);
      }

      if (httpResponse.statusCode === 200) {
         return console.log('\x1b[32mUpload successful:\x1b[0m \n', JSON.stringify(JSON.parse(body), null, 2));
      }

      if (body) {
         console.log('\x1b[31mUpload failed:\x1b[0m \n', JSON.stringify(JSON.parse(body), null, 2));
      } else {
         console.log(`\x1b[31mUpload failed, status code:\x1b[0m ${httpResponse.statusCode}`);
      }
   });
})();
