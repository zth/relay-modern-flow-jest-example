// @flow
global.__DEV__ = false; // Make sure we test for production mode
global.fetch = require('node-fetch'); // Jest has no fetch implementation by default. We make sure fetch exists in our tests by using node-fetch here.
