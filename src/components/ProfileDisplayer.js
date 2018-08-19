// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { ProfileDisplayer_user } from './__generated__/ProfileDisplayer_user.graphql';
import { UserPets } from './UserPets';

type Props = {|
  user: ProfileDisplayer_user
|};

/**
 * Using the generated Flow types for our props gives us two main benefits:
 *    1. It lets us to handle all possible null cases (very many in a
 *       GraphQL production environment!). This lets us avoid as many runtime
 *       crashes and issues as possible. Null is not an object, you get it.
 *
 *     2. It makes our app resilient to changes in the schema, since any change
 *       in the schema will be reflected in the types, and by that make Flow
 *       scream at us if things change in ways we don't handle properly.
 *
 * This is really really great and one of my absolute favorite parts about Relay.
 */

type State = {|
  showMyPets: boolean
|};

class ProfileDisplayer extends React.Component<Props, State> {
  state = {
    showMyPets: false
  };

  revealPets = () => {
    this.setState({
      showMyPets: true
    });
  };

  render() {
    const { user } = this.props;
    const { showMyPets } = this.state;

    return (
      <div className="ProfileDisplayer">
        <h3>{user.name}</h3>
        <button onClick={this.revealPets}>See my pets</button>
        {showMyPets && <UserPets userId={user.id} />}
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
    }
  `
);
