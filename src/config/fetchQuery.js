// @flow
type Operation = {
  text: string
};

function fetchQuery(operation: Operation, variables: Object): Promise<*> {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json());
}

export default fetchQuery;
