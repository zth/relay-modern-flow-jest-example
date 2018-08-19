// @flow

/**
 * These tests test the full pipeline, actually mounting your entire App to the
 * DOM. We focus on an as realistic scenario as possible, which means that we allow
 * Relay to make actual requests to an actual URL and render with the data it retrieves.
 * We'll catch the request and mock it (using the library nock through the library
 * graphql-query-test-mock) before it makes an actual request to the server,
 * but we're even testing that the request is made to the correct URL using this technique.
 *
 * In the spirit of react-testing-library we also query for actual text and
 * actual content in the DOM as much as we can, instead of components, classes or IDs that
 * may all change and break our tests without the function of the app actually changing.
 *
 * Finally, check out the config folder at the root of the project for how to set up
 * graphql-query-test-mock.
 */

import * as React from 'react';
import { queryMock } from '../../__testUtils__/queryMock';
import type { AppQueryResponse } from '../__generated__/AppQuery.graphql';
import { App } from '../App';
import { render, wait, fireEvent } from 'react-testing-library';

describe('App', () => {
  let mockAppQueryData;

  beforeEach(() => {
    // Make sure mock data is always fresh for each test run
    mockAppQueryData = {
      viewer: {
        id: '1',
        name: 'Some Name'
      }
    };
  });

  describe('First screen', () => {
    it('should render content when given a successful response', async () => {
      /**
       * App fetches the query AppQuery. Here we mock it, telling it to return our mock
       * data declared above.
       */
      queryMock.mockQuery({
        name: 'AppQuery',
        data: mockAppQueryData
      });

      /**
       * We mount the app and wait for our element that displays the app's content
       * to be visible.
       */

      const r = render(<App />);

      // The ProfileDisplayer displays the name, so we wait for that to appear
      await wait(() => r.getByText('Some Name'));

      // We make sure we also show the button to see the user's pets
      const button = r.getByText('See my pets');
      expect(button instanceof HTMLButtonElement).toBe(true);
    });

    it('should render an error screen when request fails', async () => {
      /**
       * Here we instead want to make sure that we show an error screen when requests fail,
       * so we tell graphql-query-test-mock to fail the request and return a status 500,
       * and then wait for our error screen to appear.
       */

      queryMock.mockQuery({
        name: 'AppQuery',
        data: {},
        status: 500
      });

      const r = render(<App />);
      await wait(() => r.getByText(/Something went wrong/));
    });
  });

  describe('Going to the users pet list', () => {
    let userPetsQueryData;

    beforeEach(() => {
      /**
       * More mock data here. Check out fetchQuery.js for a neat trick for avoiding writing
       * all of your mock data by hand.
       */

      userPetsQueryData = {
        User: {
          id: '1',
          name: 'Some Name',
          pets: {
            pageInfo: {
              hasNextPage: true, // This needs to be true so we can paginate
              hasPreviousPage: false,
              endCursor: 'cursor-1', // Note that we match this to the last element in the edges below
              startCursor: ''
            },
            edges: [
              {
                cursor: 'cursor-0',
                node: {
                  __typename: 'Pet',
                  id: 'pet-1',
                  name: 'Cat the Pet',
                  grade: 'A'
                }
              },
              {
                cursor: 'cursor-1',
                node: {
                  __typename: 'Pet',
                  id: 'pet-2',
                  name: 'Dog the Pet',
                  grade: 'B'
                }
              }
            ]
          }
        }
      };
    });

    test('clicking the See pets button shows us the users pets', async () => {
      /**
       * Now, we want to test going to the users pet list, and paginating that list.
       */

      // We mock the initial AppQuery like before
      queryMock.mockQuery({
        name: 'AppQuery',
        data: mockAppQueryData
      });

      const r = render(<App />);

      // Wait for the button to appear
      await wait(() => r.getByText('See my pets'));

      // We mock the UserPetsList query as well for the next screen
      queryMock.mockQuery({
        name: 'UserPetsQuery',
        variables: {
          // Here's a nifty part. We force our mocked query to only match on these variables, to make sure we pass the right stuff to the QueryRenderer
          // This means that if we for example forget to send one of the variables, or corrupt it somehow, the test errors.
          userId: '1',
          count: 2,
          cursor: ''
        },
        data: userPetsQueryData
      });

      // Click the button and wait for the title of the next screen to show
      fireEvent.click(r.getByText('See my pets'));
      await wait(() => r.getByText(/Pets of Some Name/));

      // Count the pets and make sure they're all there
      const petNodes = r.getAllByTestId('Pet');
      expect(petNodes.length).toBe(2);
      expect(r.getByText('Cat the Pet')).toBeTruthy();
      expect(r.getByText('Dog the Pet')).toBeTruthy();
    });

    it('should be possible to paginate', async () => {
      /**
       * Lets paginate!
       * We'll start by going all the way to the pets screen from the top again.
       */

      queryMock.mockQuery({
        name: 'AppQuery',
        data: mockAppQueryData
      });

      const r = render(<App />);
      await wait(() => r.getByText('See my pets'));

      queryMock.mockQuery({
        name: 'UserPetsQuery',
        variables: {
          userId: '1',
          count: 2,
          cursor: ''
        },
        data: userPetsQueryData
      });

      fireEvent.click(r.getByText('See my pets'));

      // We're now at our pet screen.
      // The pagination button should show right away as we have a next page
      await wait(() => r.getByText(/See more pets/));

      // Now, we mock the pagination query
      queryMock.mockQuery({
        name: 'UserPetsListPaginationQuery',
        variables: {
          // Again, we match on variables, but notice the cursor has changed
          userId: '1',
          count: 2,
          cursor: 'cursor-1'
        },
        data: {
          User: {
            id: '1',
            name: 'Some Name',
            pets: {
              pageInfo: {
                hasNextPage: false, // No page left
                hasPreviousPage: false,
                endCursor: 'cursor-2',
                startCursor: 'cursor-1'
              },
              edges: [
                {
                  cursor: 'cursor-2',
                  node: {
                    __typename: 'Pet',
                    id: 'pet-3',
                    name: 'Badger the Pet'
                  }
                }
              ]
            }
          }
        }
      });

      // Lets click the button to paginate and load the additional data
      fireEvent.click(r.getByText('See more pets'));

      // We wait for the new item to appear
      await wait(() => r.getByText('Badger the Pet'));

      // Since we know there's no other page, we should make sure the button to load more does not show
      expect(r.queryByText('See more pets')).toBe(null);
    });
  });

  describe('Testing loading states', () => {
    /**
     * Occasionally, we'll want to control what happens _while_ our queries are resolving.
     * Things like loading states, disabling of buttons and so on.
     *
     * graphql-query-test-mock lets us control _when_ a query resolves if we want to.
     * This way we can delay resolving the query until we've checked that all the intermediate
     * states are fine.
     *
     * Check out the example below.
     */

    it('should show a loading message before data is loaded', async () => {
      // Here graphql-query-test-mock gives us a function that we can run to tell our mocked query to resolve.
      // This means it won't resolve even if requested before we've run this function we get.
      const resolveQuery = queryMock.mockQueryWithControlledResolution({
        name: 'AppQuery',
        data: mockAppQueryData
      });

      const r = render(<App />);

      // Our loading state should be visible now, as AppQuery won't resolve until we tell it to
      expect(r.queryByText('Loading app...')).toBeTruthy();
      expect(r.queryByText('Some Name')).toBe(null);

      // Now, resolve the query and make sure the app is displayed.
      resolveQuery();

      await wait(() => r.getByText('Some Name'));
      // Everything should be loaded now
    });
  });
});
