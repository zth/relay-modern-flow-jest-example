// @flow
import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { environment } from '../config/createRelayEnvironment';
import ProfileDisplayer from './ProfileDisplayer';
import type { AppQueryResponse } from './__generated__/AppQuery.graphql';

const query = graphql`
  query AppQuery {
    viewer {
      id
      ...ProfileDisplayer_user
    }
  }
`;

export class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <QueryRenderer
          environment={environment}
          query={query}
          render={({
            error,
            props
          }: {
            error: Error,
            props: AppQueryResponse
          }) => {
            if (error) {
              console.error(error);
              return <div className="ErrorScreen">Something went wrong!</div>;
            }

            if (props) {
              // Here, Flow makes sure we pass the correct props to ProfileDisplayer
              return (
                <div className="AppDisplayer">
                  <ProfileDisplayer user={props.viewer} />
                </div>
              );
            }

            // No error or props means we're loading still
            return <div className="AppDisplayer--loading">Loading app...</div>;
          }}
        />
      </div>
    );
  }
}
