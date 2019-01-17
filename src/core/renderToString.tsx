const foundServer = require('found/lib/server');
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-redux-epic';
import { Store } from 'redux';

import { createRouterRender } from './Root';

const { JssProvider } = require('react-jss');

export default async function<State = any>({
  found,
  store,
  wrappedEpic,
  style,
}: {
  found: any;
  store: Store<State>;
  wrappedEpic: any;
  style: any;
}): Promise<{ html: string }> {
  const renderArgs = await found.getRenderArgs(store);

  return new Promise(resolve => {
    renderToString(
      <JssProvider registry={style}>
        <Provider store={store}>
          <foundServer.RouterProvider router={renderArgs.router}>
            {createRouterRender(renderArgs)}
          </foundServer.RouterProvider>
        </Provider>
      </JssProvider>,
      wrappedEpic,
    ).subscribe(({ markup }: { markup: string }) => {
      resolve({ html: markup });
    });
  });
}
