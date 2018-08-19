// @flow
import { queryMock } from '../src/__testUtils__/queryMock';
import { GRAPHQL_API_URL } from '../src/config/fetchQuery';

global.__DEV__ = false; // Make sure we test for production mode
queryMock.setup(GRAPHQL_API_URL); // Initialize our queryMock for each test suite
global.fetch = require('node-fetch'); // Jest has no fetch implementation by default. We make sure fetch exists in our tests by using node-fetch here.
