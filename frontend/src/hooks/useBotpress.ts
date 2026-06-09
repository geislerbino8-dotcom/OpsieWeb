import { useEffect } from 'react';

declare global {
  interface Window {
    botpress?: any;
  }
}

export const useBotpress = () => {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById('botpress-inject-script')) {
      return;
    }

    const injectScript = document.createElement('script');
    injectScript.id = 'botpress-inject-script';
    injectScript.src =
      'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
    injectScript.async = true;

    injectScript.onload = () => {
      console.log('Botpress inject.js loaded');

      const configScript = document.createElement('script');
      configScript.id = 'botpress-config-script';
      configScript.src =
        'https://files.bpcontent.cloud/2026/03/08/17/20260308173901-3FOO88VO.js';
      configScript.defer = true;

      configScript.onload = () => {
        console.log('Botpress config loaded');
        console.log('Botpress object:', window.botpress);
      };

      configScript.onerror = () => {
        console.error('Failed to load Botpress config');
      };

      document.body.appendChild(configScript);
    };

    injectScript.onerror = () => {
      console.error('Failed to load Botpress inject.js');
    };

    document.body.appendChild(injectScript);

    return () => {
      const inject = document.getElementById('botpress-inject-script');
      const config = document.getElementById('botpress-config-script');

      if (inject) inject.remove();
      if (config) config.remove();

      const widget = document.getElementById(
        'bp-web-widget-container'
      );
      if (widget) widget.remove();

      delete window.botpress;
    };
  }, []);
};