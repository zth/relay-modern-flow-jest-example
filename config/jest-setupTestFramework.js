// @flow
import { cleanup } from 'react-testing-library';
import { queryMock } from '../src/__testUtils__/queryMock';
import { GRAPHQL_API_URL } from '../src/config/fetchQuery';

beforeEach(() => {
  /**
   * This runs before each test.
   * We reset all mocked queries and calls.
   * We clean up mounted things from react-testing-library.
   */

  queryMock.setup(GRAPHQL_API_URL); // Initialize our queryMock for each test suite
});

afterEach(cleanup);
