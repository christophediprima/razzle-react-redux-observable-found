import express from 'express';

import { createServerConfig } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

import { styleSheets } from './components/App';
import Document from './components/Document';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

const initialState = {
  board: {
    list: [],
    loading: false,
  },
};

const serverConfig = createServerConfig<State, Action, { styleSheets: any }>(
  initialState,
  razzleAssets,
  rootEpic,
  rootReducer,
  routes,
  { Component: Document, props: styleSheets },
);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

export default server;