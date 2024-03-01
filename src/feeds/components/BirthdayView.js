import React from 'react';
import {WebView} from 'react-native';

const BirthdayList = ({YourHTMLString}) => {
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Birthday List</title>
    </head>
    <body>
      <div>${YourHTMLString}</div>
    </body>
  </html>`;

  return (
    <WebView
      originWhitelist={['*']}
      source={{html: htmlContent}}
      // style={{flex: 1}}
    />
  );
};

export default BirthdayList;
