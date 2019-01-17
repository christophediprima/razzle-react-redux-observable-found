const found = require('found');
const foundScroll = require('found-scroll');

import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

const { JssProvider } = require('react-jss');

interface StaticContainerProps {
  shouldUpdate?: boolean;
}

// StaticContainer ensures App is not rerendered on the pending state.
// We can't use react-static-container because some type clashes with RN.
class StaticContainer extends React.Component<StaticContainerProps> {
  public shouldComponentUpdate(nextProps: StaticContainerProps) {
    return !!nextProps.shouldUpdate;
  }
  public render() {
    const { children } = this.props;
    if (children === null || children === false) {
      return null;
    }
    return React.Children.only(children);
  }
}

export const createRouterRender = (renderArgs: any) => {
  return found.createRender({
    renderError: (error: Error) => (
      <div>
        <StaticContainer>{error}</StaticContainer>
      </div>
    ),
    renderPending: () => (
      <div>
        <StaticContainer>{null}</StaticContainer>
        {'loading bar'}
      </div>
    ),
    renderReady: ({ elements }: { elements: React.ReactElement<any> }) => (
      <div>
        <StaticContainer shouldUpdate>
          <found.ElementsRenderer elements={elements} />
        </StaticContainer>
      </div>
    ),
  })(renderArgs);
};

const ConnectedRouter = found.createConnectedRouter({
  render: (renderArgs: object) => (
    <foundScroll.ScrollManager renderArgs={renderArgs}>{createRouterRender(renderArgs)}</foundScroll.ScrollManager>
  ),
});

interface RootProps<State extends any> {
  renderArgs: any;
  store: Store<State>;
  styleSheets: any;
}

const Root = <State extends any>({ renderArgs, store, styleSheets }: RootProps<State>): React.ReactElement<any> => {
  return (
    <Provider store={store}>
      <JssProvider registry={styleSheets}>
        <ConnectedRouter initialRenderArgs={renderArgs} matchContext={{ store }} resolver={found.resolver} />
      </JssProvider>
    </Provider>
  );
};

export default Root;
