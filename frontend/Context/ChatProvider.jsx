import { createContext, useContext, useEffect, useState } from "react";
import Router from "next/router";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
    setUser(userInfo);
    if (!userInfo) {
      Router.push("/");
    }
  }, []);

  return (
    <ChatContext.Provider value={{ user }}>{children}</ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
