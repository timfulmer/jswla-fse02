/**
 * Created by timfulmer on 2/27/16.
 */
'use strict';

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    module.exports[name] = require('./' + file);
  }
});