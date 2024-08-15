import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const TelegramLogin = ()=> {
  const telegramLoginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const botUsername = "FoxwowoDevBot";
    const buttonSize = "large";
    const cornerRadius = "20";
    const widgetVersion = "22";
    const allowBotsendMessageToUser = "write";


    // Create the script element for the Telegram widget
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", cornerRadius);
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", allowBotsendMessageToUser);

    if (telegramLoginRef.current) {
      telegramLoginRef.current?.appendChild(script);
    } else {
      console.error("Telegram login widget element not found");
    }

    // Define the onTelegramAuth function
    window.onTelegramAuth = function(user) {
      // id, first_name, last_name, username, photo_url, auth_date and hash fields.
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    };

    // Cleanup script when component unmounts
    return () => {
      telegramLoginRef.current?.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Telegram Login</h1>
      <div id="telegram-login" ref={telegramLoginRef}></div>
    </div>
  );
}

export default TelegramLogin;
