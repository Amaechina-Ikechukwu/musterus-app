import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {adpage} from '../oldapis/ads';

const AdPage = ({mykey, mskl}) => {
  const [ad, setAd] = useState();

  const getAd = async () => {
    const result = await adpage(mykey, mskl);
    setAd(result?.content?.contentbody);
  };
  useEffect(() => {
    getAd();
  }, []);
  const htmlContent = `
    <html>
      <body>
        ${ad}
      </body>
    </html>
  `;
  return (
    <WebView
      originWhitelist={['*']}
      source={{html: htmlContent}}
      style={{}} // Adjust the style as needed
    />
  );
};

export default AdPage;
