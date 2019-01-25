import { Request } from 'express';
import { RouteConfig } from 'found';
import { wrapRootEpic as wrapRootEpicServer } from 'react-redux-epic';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose as reduxCompose,
  createStore,
  Reducer,
  ReducersMapObject,
  Store,
} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import OutputAction from './OutputAction';
import OutputState from './OutputState';

import actionToPlainObject from './actionToPlainObject';
import configureFound from './configureFound';

const farce = require('farce');

interface CreateStoreArg<State = any, Action extends AnyAction = any> {
  initialState: State;
  req?: Request;
  rootEpic: any;
  rootReducer: ReducersMapObject<State, Action>;
  routes: RouteConfig;
}

interface CreateStoreOutput<State = any, Action extends AnyAction = any> {
  found: any;
  rootEpic: any;
  store: Store<OutputState<State>, OutputAction<Action>>;
  wrappedEpic: any;
}

const compose =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === 'development'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : reduxCompose;

const hotReloadingEpic = (wrappedEpic: any) => (...args: any[]) =>
  wrappedEpic.pipe(switchMap((epic: (...args: any[]) => any) => epic(...args)));

const wrapRootEpic = <Action extends AnyAction = any>(
  epicMiddleware: EpicMiddleware<Action>,
  rootEpic: any,
  req?: Request,
) => {
  let wrappedEpic: any;

  if (!!req) {
    wrappedEpic = wrapRootEpicServer(rootEpic);
    epicMiddleware.run(wrappedEpic);
  } else {
    if (process.env.NODE_ENV === 'development') {
      wrappedEpic = new BehaviorSubject(rootEpic);
      epicMiddleware.run(hotReloadingEpic(wrappedEpic));
    } else {
      epicMiddleware.run(rootEpic);
    }
  }

  return wrappedEpic;
};

export default <State = any, Action extends AnyAction = any>({
  initialState,
  req,
  rootEpic,
  rootReducer,
  routes,
}: CreateStoreArg<State>): CreateStoreOutput<State, Action> => {
  const farceProtocol = !!req ? new farce.ServerProtocol(req.url) : new farce.BrowserProtocol();

  const found = configureFound(routes, farceProtocol);
  const epicMiddleware = createEpicMiddleware();
  const reduxMiddleware = applyMiddleware(actionToPlainObject, epicMiddleware);
  const combinedReducers = combineReducers({
    found: found.reducer as Reducer<any, OutputAction<Action>>,
    ...rootReducer,
  });

  const store: Store<OutputState<State>, OutputAction<Action>> = createStore(
    combinedReducers,
    initialState,
    compose(
      reduxMiddleware,
      ...found.storeEnhancers,
    ),
  );

  const wrappedEpic = wrapRootEpic(epicMiddleware, rootEpic, req);

  return { found, rootEpic, store, wrappedEpic };
};
