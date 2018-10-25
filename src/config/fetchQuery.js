// @flow
type Operation = {
  name: string,
  text: string
};

export const GRAPHQL_API_URL = 'http://localhost/graphql';

export function fetchQuery(
  operation: Operation,
  variables: { [key: string]: mixed }
): Promise<*> {
  return fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json()).then(res => {
    if (__DEV__) {
      /**
       * This is a cool tip. In dev mode, log responses like this.
       * This means you can copy the entire output of this console.log and
       * paste it as a query mock, queryMock.mockQuery(...pasted data...).
       *
       * A quick and convenient way to get real data from your actual API to use
       * when mocking your queries. Writing it by hand can be a bit tedious as we
       * all know.
       */

      console.log({
        name: operation.name,
        variables,
        data: res
      });
    }

    return res;
  });
}
