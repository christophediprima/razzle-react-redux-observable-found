import './client.css';

import { hydrateClient } from '@christophediprima/razzle-react-redux-observable-found';

import Action from './core/Action';
import State from './core/State';

import rootEpic from './core/rootEpic';
import rootReducer from './core/rootReducer';
import routes from './core/routes';

hydrateClient<State, Action>(rootEpic, rootReducer, routes)
  .then(() => {
    /**
     *
     * We don't need the static css any more once we have launched our application.
     *
     * https://github.com/cssinjs/examples/commit/
     * a0c178d1c99c969f8f8633c6c65b256814c455dc#diff-55465268ebcce81417d3c87474d1e9f8R6
     *
     */

    const jssStyles = document.getElementById('server-side-styles');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
