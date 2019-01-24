import { purple } from '@material-ui/core/colors';
import { createGenerateClassName, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

const { JssProvider, SheetsRegistry } = require('react-jss');

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

export const styleSheets = new SheetsRegistry();

export const App: React.FunctionComponent<any> = ({ children }) => (
  <JssProvider {...generateClassName} registry={styleSheets}>
    <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
  </JssProvider>
);
