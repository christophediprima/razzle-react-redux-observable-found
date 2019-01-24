import { SheetsRegistry } from 'jss';
import React from 'react';
import serialize from 'serialize-javascript';

export interface DocumentProps {
  assets: any;
  html: string;
  initialState: any;
  styleSheets: SheetsRegistry;
}

class Document extends React.Component<DocumentProps, any> {
  public render() {
    const {
      assets,
      html,
      // helmet,
      initialState,
      styleSheets,
    } = this.props;
    // get attributes from React Helmet
    // const htmlAttrs = helmet.htmlAttributes.toComponent();
    // const bodyAttrs = helmet.bodyAttributes.toComponent();

    // console.log(styleSheets);
    return (
      <html
      // {...htmlAttrs}
      >
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style type="text/css" id="server-side-styles">
            {styleSheets.toString()}
          </style>
          {/* {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}{' '} */}
        </head>
        <body
        // {...bodyAttrs}
        >
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
              __html: serialize({ initialState }),
            }}
          />
          <script type="text/javascript" src={assets.client.js} defer={true} crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}

export default Document;
