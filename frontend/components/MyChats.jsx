import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getSender } from "./utils/chatsUtil";
import GroupChatModal from "./common/GroupChatModal";

const MyChats = () => {
  const { user, selectedChat, chats, setSelectedChat, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/chat`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json());
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.primary",
        width: { xs: "100%", md: "30%" },
        borderRadius: "6px",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <Typography variant="h4">My Chats</Typography>
        <GroupChatModal user={user}>
          <Button variant="contained">
            <AddIcon /> Create a group Chat
          </Button>
        </GroupChatModal>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      > */}
      <Stack
        direction="column"
        spacing={1}
        sx={{
          width: "100%",
        }}
      >
        {chats?.map((chat) => (
          <Box
            key={chat._id}
            sx={{
              backgroundColor:
                selectedChat == chat
                  ? "background.default"
                  : "background.paper",
              color:
                selectedChat == chat
                  ? "background.paper"
                  : "background.default",
              cursor: "pointer",
              p: 2,
              borderRadius: "10px",
            }}
            onClick={() => setSelectedChat(chat)}
          >
            <Typography variant="h6">
              {chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}
            </Typography>
          </Box>
        ))}
      </Stack>
      {/* </Box> */}
    </Box>
  );
};

export default MyChats;
