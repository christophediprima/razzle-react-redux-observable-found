import { RouteConfig } from 'found';
import { AnyAction, ReducersMapObject } from 'redux';

import { createRenderer } from 'fela';
import { rehydrate } from 'fela-dom';

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
    const renderer = createRenderer();

    const rule = (props: any) => ({
      backgroundColor: 'red',
      color: 'blue',
      fontSize: props.size,
    });

    renderer.renderRule(rule, { backgroundColor: 'yellow' }); // => a
    renderer.renderRule(rule, { color: 'green' }); // => c
    renderer.renderRule(rule, { size: '20px' }); // => b

    renderer.renderStatic({ display: 'inline' }, 'div');

    hydrate({ element, found, store });
    rehydrate(renderer);
  }
};
