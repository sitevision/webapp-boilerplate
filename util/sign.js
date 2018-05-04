var
   inquirer    = require('inquirer'),
   fs          = require('fs'),
   request     = require('request'),
   properties  = require('../util/properties');

(function () {
   var questions = [
      {
         name: 'username',
         message: 'Username for developer.sitevision.se'
      },
      {
         name: 'password',
         type: 'password',
         message: 'Password for developer.sitevision.se'
      },
      {
         name: 'certificateName',
         message: 'Certificate name for signing (blank for default)'
      }
   ];

   inquirer.prompt(questions).then(answers => {
      var url = `https://${answers.username}:${answers.password}@developer.sitevision.se/rest-api/appsigner/signapp`,
         manifest = properties.getManifest(),
         fileName = manifest.id + '.zip',
         formData = {
            file: {
               value: fs.createReadStream(properties.DIST_DIR_PATH + '/' + fileName),
               options: {
                  filename: fileName,
                  contentType: 'application/octet-stream'
               }
            }
         };

      if (answers.certificateName) {
         url += '?certificateName=' + answers.certificateName;
      }

      request.post({url: url, formData: formData, encoding: null}, (err, httpResponse, body) => {
         if (err) {
            return console.error('Signing failed:', err);
         }

         if (httpResponse.statusCode === 200) {
            var signedFileNameAndPath = properties.DIST_DIR_PATH + '/' + manifest.id + '-signed.zip';

            fs.writeFileSync(signedFileNameAndPath, body);
            return console.log('Signing successful, created: ' + signedFileNameAndPath);
         }

         if (httpResponse.statusCode === 401) {
            return console.log('Signing failed: Unauthorized, check username and password');
         }

         console.log('Signing failed with statusCode: ' + httpResponse.statusCode + ' message: ' + httpResponse.statusMessage);
      });
   });
})();