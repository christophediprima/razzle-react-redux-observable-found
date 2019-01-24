const { createGenerateClassName, createMuiTheme/*, MuiThemeProvider*/ } = require('@material-ui/core/styles');
const foundServer = require('found/lib/server');
// const { JssProvider } = require('react-jss');

import red from '@material-ui/core/colors/red';
import React from 'react';
// import { Provider } from 'react-redux';
import { renderToString } from 'react-redux-epic';
import { Store } from 'redux';

import { createRouterRender } from './Root';

const theme = createMuiTheme({
  palette: {
    primary: red,
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

export default async function<State = any>({
  found,
  store,
  wrappedEpic,
  styleSheets,
  Providers,
}: {
  found: any;
  store: Store<State>;
  wrappedEpic: any;
  styleSheets: any;
  Providers: any;
}): Promise<{ html: string; style: string }> {
  const renderArgs = await found.getRenderArgs(store);

  const generateClassName = createGenerateClassName();

  const sheetsManager = new Map();

  return new Promise(resolve => {
    renderToString(
      <Providers
        store={store}
        registry={styleSheets}
        generateClassName={generateClassName}
        theme={theme}
        sheetsManager={sheetsManager}>
        <foundServer.RouterProvider router={renderArgs.router}>
          {createRouterRender(renderArgs)}
        </foundServer.RouterProvider>
      </Providers>,
      // <Provider store={store}>
      //   <JssProvider registry={styleSheets} generateClassName={generateClassName}>
      //     <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
      //       <foundServer.RouterProvider router={renderArgs.router}>
      //         {createRouterRender(renderArgs)}
      //       </foundServer.RouterProvider>
      //     </MuiThemeProvider>
      //   </JssProvider>
      // </Provider>,
      wrappedEpic,
    ).subscribe(({ markup }) => {
      resolve({ html: markup, style: styleSheets.toString() });
    });
  });
}
