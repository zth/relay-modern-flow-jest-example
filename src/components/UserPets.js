// @flow
import { QueryRenderer, graphql } from 'react-relay';
import * as React from 'react';
import { environment } from '../config/createRelayEnvironment';
import type {
  UserPetsQueryResponse,
  UserPetsQueryVariables
} from './__generated__/UserPetsQuery.graphql';
import UserPetsList from './UserPetsList';

type Props = {|
  userId: string
|};

const query = graphql`
  query UserPetsQuery($userId: ID!, $count: Int!, $cursor: String) {
    User(userId: $userId) {
      id
      ...UserPetsList_user
    }
  }
`;

/**
 * This view shows the users pets. It allows you to paginate through all available pets,
 * 2 at a time. We'll have lots of things to test in this view, like pagination.
 */

export class UserPets extends React.Component<Props> {
  render() {
    const { userId } = this.props;

    // Relay generates Flow types for our variables, allowing us to make sure we pass the correct variables. Very neat!
    const variables: UserPetsQueryVariables = {
      userId,
      count: 2, // Initial count to fetch. The pagination container takes care of this as we load more
      cursor: '' // We start fetching from the start of the list, so we don't need to set the cursor to anything. The pagination will set this appropriately when loading more.
    };

    return (
      <div className="UserPets">
        <QueryRenderer
          environment={environment}
          query={query}
          variables={variables}
          render={({
            error,
            props
          }: {
            error: Error,
            props: UserPetsQueryResponse
          }) => {
            if (error) {
              return (
                <div className="ErrorScreen">
                  Oh no! Something went wrong getting the pets!
                </div>
              );
            }

            if (props) {
              return (
                <div className="UserPetsDisplayer">
                  <UserPetsList user={props.User} />
                </div>
              );
            }

            return (
              <div className="UserPetsDisplayer--loading">Loading pets...</div>
            );
          }}
        />
      </div>
    );
  }
}
