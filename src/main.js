define(function(require) {
   'use strict';

   var
      Component  = require('Component'),
      template   = require('/template/main');

   return Component.extend({

      template: template
   });
});