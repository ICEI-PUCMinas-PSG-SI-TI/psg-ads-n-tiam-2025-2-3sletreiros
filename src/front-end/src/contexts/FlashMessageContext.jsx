import { createContext, useState, useCallback } from 'react';
import FlashMessage from "@components/FlashMessage/FlashMessage";

export const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [messageData, setMessageData] = useState({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showFlashMessage = useCallback((message, type = 'info') => {
    setMessageData({ message, type, isVisible: true });

    setTimeout(() => {
      setMessageData(prev => ({ ...prev, isVisible: false }));
    }, 3500);
  }, []);

  const value = {
    showFlashMessage,
  };

  return (
    <FlashMessageContext.Provider value={value}>
      {children}
      <FlashMessage 
        message={messageData.message} 
        type={messageData.type} 
        isVisible={messageData.isVisible}
      />
    </FlashMessageContext.Provider>
  );
};