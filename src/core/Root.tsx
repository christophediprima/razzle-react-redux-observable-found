const { createGenerateClassName, createMuiTheme, MuiThemeProvider } = require('@material-ui/core/styles');
const found = require('found');
const foundScroll = require('found-scroll');
const { JssProvider } = require('react-jss');

import purple from '@material-ui/core/colors/purple';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

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

const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
  palette: {
    primary: purple,
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

const Root = <State extends any>({ renderArgs, store }: RootProps<State>): React.ReactElement<any> => {
  return (
    <Provider store={store}>
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter initialRenderArgs={renderArgs} matchContext={{ store }} resolver={found.resolver} />
        </MuiThemeProvider>
      </JssProvider>
    </Provider>
  );
};

export default Root;
