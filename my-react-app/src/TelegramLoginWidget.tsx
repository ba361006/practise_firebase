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
    // Create the script element for the Telegram widget
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "FoxwowoDevBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.body.appendChild(script);

    // Define the onTelegramAuth function
    window.onTelegramAuth = function(user) {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    };

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
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
