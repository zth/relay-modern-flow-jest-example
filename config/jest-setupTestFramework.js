// @flow
import { cleanup } from 'react-testing-library';
import { queryMock } from '../src/__testUtils__/queryMock';

beforeEach(() => {
  /**
   * This runs before each test.
   * We reset all mocked queries and calls.
   * We clean up mounted things from react-testing-library.
   */

  queryMock.reset();
});

afterEach(cleanup);
