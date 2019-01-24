const foundServer = require('found/lib/server');

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-redux-epic';
import { Store } from 'redux';

import { createRouterRender } from './Root';

export default async function<State = any>({
  found,
  store,
  wrappedEpic,
}: {
  found: any;
  store: Store<State>;
  wrappedEpic: any;
}): Promise<{ html: string }> {
  const renderArgs = await found.getRenderArgs(store);

  return new Promise(resolve => {
    renderToString(
      <Provider store={store}>
        <foundServer.RouterProvider router={renderArgs.router}>
          {createRouterRender(renderArgs)}
        </foundServer.RouterProvider>
      </Provider>,
      wrappedEpic,
    ).subscribe(({ markup }) => {
      resolve({ html: markup });
    });
  });
}
