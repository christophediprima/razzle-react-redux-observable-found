import React from 'react';

import express from 'express';

import { createServerConfig } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

import Document from './CustomDocument';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

const initialState = {
  board: {
    list: [],
    loading: false,
  },
};

class Providers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{color: 'red'}}>yo</h1>

        {this.props.children}
      </React.Fragment>
    )
  }
}

const serverConfig = createServerConfig<State, Action>(
  initialState,
  razzleAssets,
  rootEpic,
  rootReducer,
  routes,
  Providers,
  Document,
);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

export default server;
