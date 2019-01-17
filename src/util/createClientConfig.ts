import { RouteConfig } from 'found';
import { AnyAction, ReducersMapObject } from 'redux';

import createStore from '../core/createStore';
import hydrate from '../core/hydrate';

// rename to hydrate
export default <State = any, Action extends AnyAction = any>(
  rootEpic: any,
  rootReducer: ReducersMapObject<State, Action>,
  routes: RouteConfig,
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
    hydrate({ element, found, store });

    /**
     *
     * We don't need the static css any more once we have launched our application.
     *
     * https://github.com/cssinjs/examples/commit/a0c178d1c99c969f8f8633c6c65b256814c455dc#diff-55465268ebcce81417d3c87474d1e9f8R6
     *
     */
    const jssStyles = document.getElementById('server-side-styles');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
};
