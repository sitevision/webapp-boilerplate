var jsonfile = require('jsonfile');

const DEV_PROPERTIES = './.dev_properties.json';
const MANIFEST = './src/manifest.json';
const DIST_DIR_PATH = './dist';
const SRC_DIR_PATH  = './src';

module.exports = {
   DEV_PROPERTIES: DEV_PROPERTIES,
   MANIFEST: MANIFEST,
   DIST_DIR_PATH: DIST_DIR_PATH,
   SRC_DIR_PATH: SRC_DIR_PATH,
   getDevProperties: () => jsonfile.readFileSync(DEV_PROPERTIES),
   getManifest: () => jsonfile.readFileSync(MANIFEST)
};