import React from 'react';
import { render } from 'react-redux-epic/client';
import { Store } from 'redux';

import Root from './Root';

export default function<State = any>({
  element,
  found,
  store,
}: {
  element: HTMLElement;
  found: any;
  store: Store<State>;
}): void {
  found.getRenderArgs(store).then((renderArgs: any) => {
    render(<Root renderArgs={renderArgs} store={store} />, element).subscribe();
  });
}
