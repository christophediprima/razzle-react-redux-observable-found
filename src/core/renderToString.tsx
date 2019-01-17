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
  styleSheets,
}: {
  found: any;
  store: Store<State>;
  wrappedEpic: any;
  styleSheets: any;
}): Promise<{ html: string; style: string }> {
  const renderArgs = await found.getRenderArgs(store);

  return new Promise(resolve => {
    renderToString(
      <Provider store={store}>
        <JssProvider registry={styleSheets}>
          <foundServer.RouterProvider router={renderArgs.router}>
            {createRouterRender(renderArgs)}
          </foundServer.RouterProvider>
        </JssProvider>
      </Provider>,
      wrappedEpic,
    ).subscribe(({ markup }) => {
      resolve({ html: markup, style: styleSheets.toString() });
    });
  });
}
