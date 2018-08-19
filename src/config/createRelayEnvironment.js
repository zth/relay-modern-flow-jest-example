// @flow
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { fetchQuery } from './fetchQuery';

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);

export const environment = new Environment({
  network,
  store
});
