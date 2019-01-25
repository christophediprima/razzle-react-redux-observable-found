import { RouteConfig } from 'found';
import { AnyAction, ReducersMapObject } from 'redux';

import createStore from '../core/createStore';
import hydrate, { CustomHydrate } from '../core/hydrate';

export default <State = any, Action extends AnyAction = any>(
  rootEpic: any,
  rootReducer: ReducersMapObject<State, Action>,
  routes: RouteConfig,
  customHydrate?: CustomHydrate,
) => {
  const initialState: State = JSON.parse(
    // param for the server state location
    (document.getElementById('server-app-state') || { textContent: '{}' }).textContent || '{}',
  ).initialState;

  // param for mounting location of react nodes
  const element = document.getElementById('root');

  const { found, store } = createStore<State, Action>({
    initialState,
    rootEpic,
    rootReducer,
    routes,
  });

  if (element) {
    hydrate({ element, found, store, customHydrate });
  }
};
