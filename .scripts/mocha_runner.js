require('babel-core/register');
require('babel-polyfill');
require('css-modules-require-hook')({
  generateScopedName: function(exportedName, path) {
    return exportedName;
  }
});

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

global.navigator = {
  userAgent: 'node.js'
};

process.on('unhandledRejection', function (error) {
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
});
