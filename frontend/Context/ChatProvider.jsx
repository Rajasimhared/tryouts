import { createContext, useContext, useEffect, useState } from "react";
import Router from "next/router";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
    setUser(userInfo);
    if (!userInfo) {
      Router.push("/");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ user, selectedChat, setSelectedChat, setChats, chats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
