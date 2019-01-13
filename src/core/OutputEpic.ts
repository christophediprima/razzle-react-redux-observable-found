import { AnyAction } from 'redux';
import { Epic as ReduxObservableEpic } from 'redux-observable';

import OutputAction from './OutputAction';
import OutputState from './OutputState';

type OutputEpic<Action extends AnyAction = any, State = any> = ReduxObservableEpic<
  OutputAction<Action>,
  OutputAction<Action>,
  OutputState<State>
>;

export default OutputEpic;
