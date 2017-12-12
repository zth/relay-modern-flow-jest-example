// @flow
import { mount } from 'enzyme';
import * as React from 'react';
import { testIdSelector } from '../../__testUtils__/testIdSelector';
import ProfileDisplayer from '../ProfileDisplayer';
import type { ProfileDisplayer_user } from '../__generated__/ProfileDisplayer_user.graphql';

/**
 * These are traditional Enzyme-simulate-evaluate tests.
 * Here we've mocked react-relay's createFragmentContainer to simply
 * return back the same component it was given, making it so that you
 * can feed it props like any other component (check out __mocks__/react-relay.js).
 *
 * This simplifies isolated testing of the component, but naturally does not test
 * Relay/that the data is actually passed through to the component when rendered
 * for real.
 *
 * Check out App-tests.js for an example of how to test the entire pipeline from
 * request to render, mimicking reality as much as possible.
 */

describe('ProfileDisplayer', () => {
  let userProp: ProfileDisplayer_user;
  let wrapper;
  let messageCount = 12;
  let name = 'Test Name';

  beforeEach(() => {
    userProp = {
      id: 'test-id',
      name,
      messages: {
        count: messageCount
      }
    };

    wrapper = mount(<ProfileDisplayer user={userProp} />);
  });

  it('should show the users name', () => {
    const titleWrapper = wrapper.find(
      testIdSelector('ProfileDisplayer__title')
    );
    expect(titleWrapper.length).toBe(1);
    expect(titleWrapper.text()).toBe(userProp.name);
  });

  describe('Message count button', () => {
    it('should show a button to toggle showing the users message count', () => {
      const buttonWrapper = wrapper.find(
        testIdSelector('ProfileDisplayer__show-message-count-button')
      );

      expect(buttonWrapper.length).toBe(1);
    });

    test('clicking the button should show the users message count', () => {
      function getMessageCountNode() {
        return wrapper.find(testIdSelector('ProfileDisplayer__message-count'));
      }

      expect(getMessageCountNode().length).toBe(0);

      const buttonWrapper = wrapper.find(
        testIdSelector('ProfileDisplayer__show-message-count-button')
      );

      buttonWrapper.simulate('click');

      expect(getMessageCountNode().length).toBe(1);
      expect(getMessageCountNode().text()).toBe(messageCount.toString());
    });
  });
});
