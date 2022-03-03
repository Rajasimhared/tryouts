import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chats = () => {
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          p: "10px",
          height: "91vh",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
