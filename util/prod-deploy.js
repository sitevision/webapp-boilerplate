var
   inquirer    = require('inquirer'),
   fs          = require('fs'),
   request     = require('request'),
   properties  = require('../util/properties'),
   queryString = require('querystring');

(function () {
   var props = properties.getDevProperties(),
      questions = [
         {
            name: 'domain',
            message: 'Production site domain (www.example.com)'
         },
         {
            name: 'siteName',
            default: props.siteName,
            message: 'Production site name'
         },
         {
            name: 'addonName',
            default: props.addonName,
            message: 'Production site addon name'
         },
         {
            name: 'username',
            default: props.username,
            message: 'Username for production site'
         },
         {
            name: 'password',
            type: 'password',
            message: 'Password for production site'
         }
      ];

   inquirer.prompt(questions).then(answers => {
      var url = `https://${encodeURIComponent(answers.username)}:${encodeURIComponent(answers.password)}@${answers.domain}/rest-api/1/0/${queryString.escape(answers.siteName)}/Addon%20Repository/${answers.addonName}/webAppImport`,
         manifest = properties.getManifest(),
         formData = {
            file: fs.createReadStream(properties.DIST_DIR_PATH + '/' + manifest.id + '-signed.zip')
         };

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
   });
})();
