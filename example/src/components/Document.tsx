import { DocumentProps } from '@christophediprima/razzle-react-redux-observable-found';
import React from 'react';

import { SheetsRegistry } from 'react-jss';

export interface DocumentExtraProps {
  styleSheets: SheetsRegistry;
}

class Document extends React.Component<DocumentProps & DocumentExtraProps> {
  public render() {
    const { assets, html, initialState, styleSheets } = this.props;

    return (
      <html>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets.client.css ? <link rel="stylesheet" href={assets.client.css} /> : ''}
          <style type="text/css" id="server-side-styles">
            {styleSheets.toString()}
          </style>
        </head>
        <body>
          <h1>hello from the custom Document</h1>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <script
            id="server-app-state"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ initialState }),
            }}
          />
          <script type="text/javascript" src={assets.client.js} defer={true} crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}

export default Document;
