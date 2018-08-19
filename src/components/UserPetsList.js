// @flow
import { graphql, createPaginationContainer } from 'react-relay';
import type { UserPetsList_user } from './__generated__/UserPetsList_user.graphql';
import * as React from 'react';

type Props = {|
  relay: {
    hasMore: () => boolean,
    loadMore(pageSize: number, callback: ?(error: ?Error) => void): ?Object,
    isLoading: () => boolean
  },
  user: UserPetsList_user
|};

type State = {|
  loading: boolean
|};

/**
 * This is the pagination container showing the list of pets.
 * It also shows a "Load more" button, which loads more pets until
 * there are no more to load.
 */

class UserPetsList extends React.Component<Props, State> {
  state = {
    loading: false
  };

  loadMore = () => {
    const { relay } = this.props;

    if (relay.hasMore() && !relay.isLoading()) {
      this.setState({
        loading: true
      });

      relay.loadMore(2, () => {
        this.setState({
          loading: false
        });
      });
    }
  };

  render() {
    const { user, relay } = this.props;
    const { loading } = this.state;

    // TIP: Type safe way of extracting connection nodes to an array with Flow.
    const userPets =
      user.pets && user.pets.edges
        ? user.pets.edges
            .filter(Boolean) // Remove any null edges
            .map(edge => edge.node) // Extract node
            .filter(Boolean) // Remove any null nodes
        : [];

    // Flow now understands this is a list of nodes with the same shape as we request from the GraphQL API.
    // flow type-at-pos gives: [] | Array<{|+id: string, +name: string|}>

    return (
      <div>
        <h1>Pets of {user.name}</h1>
        <div>
          {userPets.map(pet => (
            <div key={pet.id} data-testid="Pet">
              <h2>{pet.name}</h2>
            </div>
          ))}
          {relay.hasMore() && (
            <button onClick={this.loadMore} disabled={loading}>
              See more pets
            </button>
          )}
          {loading && <div>Loading more pets...</div>}
        </div>
      </div>
    );
  }
}

export default createPaginationContainer(
  UserPetsList,
  graphql`
    fragment UserPetsList_user on User {
      id
      name
      pets(first: $count, after: $cursor)
        @connection(key: "UserPetsList_pets") {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `,
  {
    getVariables(props: Props, { count, cursor }) {
      return {
        userId: props.user.id,
        count,
        cursor
      };
    },
    query: graphql`
      query UserPetsListPaginationQuery(
        $count: Int!
        $cursor: String
        $userId: ID!
      ) {
        User(userId: $userId) {
          ...UserPetsList_user
        }
      }
    `
  }
);
