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
    const allowBotsendMessageToUser = "write";

    const script = document.createElement('script');
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
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

    const telegramLoginCallback = (user: TelegramUser) => {
      // after user login telegram, this function will be invoked
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    };

    window.onTelegramAuth = telegramLoginCallback;

    return () => {
      telegramLoginRef.current?.removeChild(script);
    };
  }, []);

  return (
    <div id="telegram-login" ref={telegramLoginRef}></div>
  );
}

export default TelegramLogin;
