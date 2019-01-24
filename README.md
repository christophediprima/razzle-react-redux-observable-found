# razzle-react-redux-observable-found

> Bootstrap Razzle full SRR React App with [Redux-Observable](https://redux-observable.js.org/) and [Found](https://github.com/4Catalyzer/found)

## Install

```bash
npm install --save razzle-react-redux-observable-found
```

## Basic Usage

```ts
// server.ts
import express from 'express';

import { createServerConfig } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

const razzleAssets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
const server = express();

const initialState = {
  board: {
    list: [],
    loading: false,
  },
};

const serverConfig = createServerConfig<State, Action>({ initialState, razzleAssets, rootEpic, rootReducer, routes });

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || ''))
  .get('/*', serverConfig);

export default server;
```

```ts
// client.ts
import './client.css';

import { createClientConfig } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

createClientConfig<State, Action>(rootEpic, rootReducer, routes);
```

Have a look at the example for usage with a custom document and extra providers!

**razzle-react-redux-observable-found** is build with [create-react-library](https://github.com/transitive-bullshit/create-react-library)

## Inspirations

- https://github.com/este

## License

MIT © [christophediprima](https://github.com/christophediprima)
