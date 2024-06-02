import React from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=G-3S6ZYM7VP6`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3S6ZYM7VP6', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;