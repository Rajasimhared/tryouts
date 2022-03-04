import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getSenderName } from "./utils/chatsUtil";
import GroupChatModal from "./common/GroupChatModal";

const MyChats = () => {
  const { user, selectedChat, chats, setSelectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: selectedChat
          ? { xs: "none", md: "flex" }
          : { xs: "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.primary",
        width: selectedChat
          ? { xs: "100%", md: "30%" }
          : { xs: "100%", md: "30%" },
        borderRadius: "6px",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
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
                selectedChat._id == chat._id
                  ? "background.default"
                  : "background.paper",
              color:
                selectedChat._id == chat._id
                  ? "background.paper"
                  : "background.default",
              cursor: "pointer",
              p: 2,
              borderRadius: "10px",
            }}
            onClick={() => setSelectedChat(chat)}
          >
            <Typography variant="h6">
              {chat.isGroupChat
                ? chat.chatName
                : getSenderName(user, chat.users)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MyChats;
