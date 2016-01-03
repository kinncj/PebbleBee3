var config = require('./config.json');
var App    = require('./app/App');

Pebble._APP_KEY = config.APP_KEY;

App.show();