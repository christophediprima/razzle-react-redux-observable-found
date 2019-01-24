import { Request, Response } from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnyAction, ReducersMapObject } from 'redux';

import createStore from '../core/createStore';
import renderToString from '../core/renderToString';
import DefaultDocument, { DocumentProps } from './Document';

const { SheetsRegistry } = require('react-jss');

export default function<State = any, Action extends AnyAction = any>(
  initialState: State,
  razzleAssets: any,
  rootEpic: any,
  rootReducer: ReducersMapObject<State, Action>,
  routes: any,
  Document?: React.ComponentClass<DocumentProps>,
  // Document?: React.ComponentClass = DefaultDocument,
) {
  return async (req: Request, res: Response) => {
    const storeArg = {
      initialState,
      req,
      rootEpic,
      rootReducer,
      routes,
    };

    const { found, store, wrappedEpic } = createStore<State, Action>(storeArg);

    try {
      const styleSheets = new SheetsRegistry();

      const { html } = await renderToString({ found, store, wrappedEpic, styleSheets });

      const documentProps = {
        assets: razzleAssets,
        html,
        initialState: store.getState(),
        styleSheets,
      };

      const document = Document ? <Document {...documentProps} /> : <DefaultDocument {...documentProps} />;
      const staticMarkup = renderToStaticMarkup(document);

      res.send(staticMarkup);
    } catch (error) {
      console.error(error);

      res.status(500).send(error.message);
    }
  };
}
