import React from 'react';
import { render } from 'react-redux-epic/client';
import { Store } from 'redux';

import Root from './Root';

export type CustomHydrate = (error?: Error | undefined) => void;

export default function<State = any>({
  element,
  found,
  store,
  customHydrate,
}: {
  element: HTMLElement;
  found: any;
  store: Store<State>;
  customHydrate?: CustomHydrate;
}): void {
  found
    .getRenderArgs(store)
    .then((renderArgs: any) => {
      render(<Root renderArgs={renderArgs} store={store} />, element).subscribe();
    })
    .catch((error: Error) => {
      if (customHydrate) {
        customHydrate(error);
      }
    })
    .finally(() => {
      if (customHydrate) {
        customHydrate();
      }
    });
}
