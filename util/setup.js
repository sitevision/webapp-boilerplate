var 
   inquirer    = require('inquirer'),
   jsonfile    = require('jsonfile'),
   properties  = require('../util/properties');

(function () {
   var questions = [
      {
         name: 'domain',
         message: 'Development domain (www.example.com)'
      },
      {
         name: 'siteName',
         message: 'Development site name'
      },
      {
         name: 'addonName',
         message: 'Development addon name'
      },
      {
         name: 'username',
         message: 'Username for development site'
      },
      {
         name: 'password',
         type: 'password',
         message: 'Password for development site'
      }
   ];

   inquirer.prompt(questions).then(answers => {
      jsonfile.writeFileSync(properties.DEV_PROPERTIES, answers);
   });
})();