// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

const targetNode = document.getElementById('app');

if (targetNode) {
  ReactDOM.render(<App />, targetNode);
}
