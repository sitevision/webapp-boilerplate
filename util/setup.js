var 
   inquirer    = require('inquirer'),
   jsonfile    = require('jsonfile'),
   properties  = require('../util/properties');

(function () {
   var questions = [
      {
         name: 'domain',
         message: 'Website domain (www.example.com)'
      },
      {
         name: 'siteName',
         message: 'Site name'
      },
      {
         name: 'addonName',
         message: 'Addon name'
      },
      {
         name: 'username',
         message: 'Username'
      },
      {
         name: 'password',
         type: 'password',
         message: 'Password'
      }
   ];

   inquirer.prompt(questions).then(answers => {
      jsonfile.writeFileSync(properties.DEV_PROPERTIES, answers);
   });
})();