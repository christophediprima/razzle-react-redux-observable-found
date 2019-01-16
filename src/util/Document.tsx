import React from 'react';
import serialize from 'serialize-javascript';

interface StyleObject {
  css: string;
  rehydration: number;
  type: string;
}

class Document extends React.Component<any, any> {
  public render() {
    const {
      assets,
      html,
      // helmet,
      initialState,
      cssSheetList,
    } = this.props;
    // get attributes from React Helmet
    // const htmlAttrs = helmet.htmlAttributes.toComponent();
    // const bodyAttrs = helmet.bodyAttributes.toComponent();
    return (
      <html
      // {...htmlAttrs}
      >
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {cssSheetList.map(({ css, rehydration, type }: StyleObject, key: number) => (
            <style key={key} type="text/css" data-fela-rehydration={rehydration} data-fela-type={type}>
              {css}
            </style>
          ))}
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
