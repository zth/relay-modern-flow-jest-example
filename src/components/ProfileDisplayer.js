// @flow
import { createFragmentContainer, graphql } from 'react-relay';
import * as React from 'react';
import type { ProfileDisplayer_user } from './__generated__/ProfileDisplayer_user.graphql';

type Props = {
  user: ProfileDisplayer_user
};

/**
 * Using the generated Flow types for our props gives us two main benefits:
 *    1. It lets Flow * us to handle all possible null cases (very many in a
 *       GraphQL production environment!). This lets us avoid as many runtime
 *       crashes and issues as possible. Null is not an object, you get it.
 *
*     2. It makes our app resilient to changes in the schema, since any change
 *       in the schema will be reflected in the types, and by that make Flow
 *       scream at us if things change in ways we don't handle properly.
 *
 * This is really really great and one of my absolute favorite parts about Relay.
 */

type State = {
  showMessageCount: boolean
};

class ProfileDisplayer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMessageCount: false
    };
  }

  toggleShowMessageCount = () => {
    this.setState(state => ({
      showMessageCount: !state.showMessageCount
    }));
  };

  render() {
    const { user } = this.props;
    return (
      <div className="ProfileDisplayer">
        <h3 data-testid="ProfileDisplayer__title">
          {user.name}
        </h3>

        <button
          onClick={this.toggleShowMessageCount}
          data-testid="ProfileDisplayer__show-message-count-button"
        >
          Show message count
        </button>

        {this.state.showMessageCount &&
          user &&
          user.messages &&
          <div className="ProfileDisplayer__message-count">
            Messages:{' '}
            <strong data-testid="ProfileDisplayer__message-count">
              {user.messages.count}
            </strong>
          </div>}
      </div>
    );
  }
}

export default createFragmentContainer(
  ProfileDisplayer,
  graphql`
    fragment ProfileDisplayer_user on User {
      id
      name
      messages {
        count
      }
    }
  `
);
