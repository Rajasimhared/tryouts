import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chats = () => {
  const { user, setChats, selectedChat } = ChatState();
  console.log("tets", user);
  const fetchChats = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/chat`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json());
      setChats(data);
      console.log(selectedChat);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user && fetchChats();
  }, [user]);

  return (
    <div>
      {" "}
      {user && <SideDrawer />}{" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          p: 2,
          height: "91vh",
        }}
      >
        {" "}
        {user && <MyChats />} {user && <ChatBox fetchChats={fetchChats} />}{" "}
      </Box>{" "}
    </div>
  );
};

export default Chats;
