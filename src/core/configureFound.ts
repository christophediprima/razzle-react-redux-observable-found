const found = require('found');
const FarceActions = require('farce/lib/Actions');

const createHistoryEnhancer = require('farce/lib/createHistoryEnhancer');
const queryMiddleware = require('farce/lib/queryMiddleware');

import { RouteConfig } from 'found';
import { Reducer, Store, StoreEnhancer } from 'redux';

export interface FoundConfig {
  getRenderArgs: <S extends Store>(store: S) => Promise<{ router: any }>;
  reducer: Reducer;
  storeEnhancers: StoreEnhancer[];
  replaceRouteConfig: (nextRouteConfig: RouteConfig) => void;
}

const configureFound = (routeConfig: RouteConfig, historyProtocol: any): FoundConfig => {
  const matcher = new found.Matcher(routeConfig);

  const getRenderArgs = async <S extends Store>(store: S): Promise<{ router: any }> => {
    store.dispatch(FarceActions.init());
    const renderArgs = await found.getStoreRenderArgs({
      matchContext: { store },
      resolver: found.resolver,
      store,
    });
    return renderArgs;
  };

  // For hot reloading.
  const replaceRouteConfig = (nextRouteConfig: RouteConfig): void => {
    matcher.routeConfig = nextRouteConfig;
  };

  const historyEnhancer = createHistoryEnhancer({
    middlewares: [queryMiddleware],
    protocol: historyProtocol,
  });

  const storeEnhancers = [historyEnhancer, found.createMatchEnhancer(matcher)];

  return {
    getRenderArgs,
    reducer: found.foundReducer,
    replaceRouteConfig,
    storeEnhancers,
  };
};

export default configureFound;
