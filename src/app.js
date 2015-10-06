var
   router   = require('router'),
   appData  = require('appData');

router.get('/',  function(req, res) {
   res.render('index', {
      name: appData.get('name')
   });
});
