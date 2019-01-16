import { Request, Response } from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnyAction, ReducersMapObject } from 'redux';

import createStore from '../core/createStore';
import renderToString from '../core/renderToString';
import Document from './Document';

import { renderToSheetList } from 'fela-dom';

import FelaRenderer from '../core/felaRenderer';

export default function<State = any, Action extends AnyAction = any>(
  initialState: State,
  razzleAssets: any,
  rootEpic: any,
  rootReducer: ReducersMapObject<State, Action>,
  routes: any,
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
      const felaRenderer = FelaRenderer();
      const cssSheetList = await renderToSheetList(felaRenderer);

      const { html } = await renderToString({ found, store, wrappedEpic });
      const document = <Document {...{ html, assets: razzleAssets, initialState: store.getState(), cssSheetList }} />;
      const staticMarkup = renderToStaticMarkup(document);

      res.send(staticMarkup);
    } catch (error) {
      console.error(error);

      res.status(500).send(error.message);
    }
  };
}
