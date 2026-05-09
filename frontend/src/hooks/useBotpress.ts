import { useEffect } from 'react';

export const useBotpress = () => {
  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    // 2. Inject your specific config script
    const configScript = document.createElement('script');
    configScript.src = "https://files.bpcontent.cloud/2026/03/08/17/20260308173901-3FOO88VO.js";
    configScript.defer = true;
    document.body.appendChild(configScript);

    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
      
      const botpressUI = document.getElementById('bp-web-widget-container');
      if (botpressUI) botpressUI.remove();
      
      // Clean up global Botpress object to prevent memory leaks
      delete (window as any).botpress;
    };
  }, []);
};