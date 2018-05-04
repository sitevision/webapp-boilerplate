var
   zipdir      = require('zip-dir'),
   fs          = require('fs'),
   properties  = require('../util/properties');

(function () {
   if (!fs.existsSync(properties.DIST_DIR_PATH)) {
      fs.mkdirSync(properties.DIST_DIR_PATH);
   }

   var manifest = properties.getManifest();

   zipdir(properties.SRC_DIR_PATH, {saveTo: properties.DIST_DIR_PATH + '/' + manifest.id + '.zip'}, (err) => {
      if (err) {
         return console.error('Compression failed:', err);
      }

      console.log('Compression successful');
   });
})();