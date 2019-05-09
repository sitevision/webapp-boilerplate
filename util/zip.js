var
   zipdir      = require('zip-dir'),
   fs          = require('fs'),
   properties  = require('../util/properties'),
   chalk       = require('chalk');

(function () {
   if (!fs.existsSync(properties.DIST_DIR_PATH)) {
      fs.mkdirSync(properties.DIST_DIR_PATH);
   }

   var manifest = properties.getManifest();

   zipdir(properties.SRC_DIR_PATH, {saveTo: properties.DIST_DIR_PATH + '/' + manifest.id + '.zip'}, (err) => {
      if (err) {
         return console.error(`${chalk.red('Compression failed:')}, ${err}`);
      }

      console.log(`${chalk.green('Compression successful')}`);
   });
})();