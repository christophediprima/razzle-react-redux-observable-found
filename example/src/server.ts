import express from 'express';

import { createServer } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

import Document, { DocumentExtraProps } from './components/Document';
import { styleSheets } from './components/Providers';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

const initialState = {
  board: {
    list: [],
    loading: false,
  },
};

const serverConfig = createServer<State, Action, DocumentExtraProps>({
  document: { Component: Document, props: { styleSheets } },
  initialState,
  razzleAssets,
  rootEpic,
  rootReducer,
  routes,
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

export default server;
