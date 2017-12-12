// @flow

/**
 * These tests test the full pipeline, actually mounting your entire App and
 * rendering it with actual (mock) data retrieved from a mock request.
 *
 * We mock at the fetch level here, in order to let Relay and React render and
 * run just like they will in the actual app.
 *
 * This is more cumbersome of course, but a good way of ensuring that the full
 * app works as well.
 */

jest.unmock('react-relay'); // We unmock react-relay since we want to use the real module here, and not our mock of it in __mocks__/
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import * as React from 'react';
import { mockFetch } from '../../__testUtils__/mockFetch';
import { testIdSelector } from '../../__testUtils__/testIdSelector';
import { App } from '../App';
import ProfileDisplayer from '../ProfileDisplayer';

describe('App', () => {
  let appQueryResponse;
  const messageCount = 12;
  const testName = 'Test Name';

  beforeEach(() => {
    /**
     * Mock the full response as App's QueryRenderer expects it.
     */

    appQueryResponse = {
      viewer: {
        id: 'viewer-id',
        user: {
          id: 'test-id',
          name: testName,
          messages: {
            count: messageCount
          }
        }
      }
    };
  });

  it('should render content when given a successful response', async () => {
    /**
     * We make sure fetch returns our data so Relay can render it.
     */

    mockFetch({ response: { data: appQueryResponse } });

    /**
     * We mount the app and wait for our element that displays the app's content
     * to be visible.
     */

    const wrapper = mount(<App />);
    await waitForElement(wrapper, testIdSelector('App__Displayer'));
    expect(wrapper.find(testIdSelector('App__Displayer')).length).toBe(1);
    expect(wrapper.find(ProfileDisplayer).length).toBe(1);
  });

  it('should render an error screen when request fails', async () => {
    /**
      * Here we instead want to make sure that we show an error screen when requests fail,
      * so we mock fetch to fail the request, and then wait for our error sreen to appear.
    */

    mockFetch({ status: 500, response: {} });
    const wrapper = mount(<App />);
    await waitForElement(wrapper, testIdSelector('App__ErrorScreen'));
    expect(wrapper.find(testIdSelector('App__ErrorScreen')).length).toBe(1);
  });
});
