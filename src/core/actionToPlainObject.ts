import { AnyAction, Middleware } from 'redux';

const isPresent = (obj: any): boolean => obj !== undefined && obj !== null;
const isObjectLike = (val: any): val is {} => isPresent(val) && typeof val === 'object';

const actionToPlainObject: Middleware<any, AnyAction> = () => next => (action: AnyAction) => {
  if (isObjectLike(action)) {
    return next({ ...action });
  }
  throw new Error(`action must be an object: ${action}`);
};

export default actionToPlainObject;
