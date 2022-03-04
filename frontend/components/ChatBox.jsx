import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getSenderName, getSender } from "./utils/chatsUtil";
import Dialog from "./common/Dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateGroupChatModal from "./common/UpdateGroupChatModal";

const ChatBox = ({ fetchChats }) => {
  const { user, selectedChat, chats, setSelectedChat, setChats } = ChatState();
  return (
    <Box
      sx={{
        display: selectedChat
          ? { xs: "flex", md: "flex" }
          : { xs: "none", md: "flex" },
        flexDirection: "column",
        backgroundColor: "background.primary",
        width: selectedChat ? { xs: "100%", md: "69%" } : { md: "69%" },
        borderRadius: "6px",
        p: 3,
        ml: 2,
      }}
    >
      {selectedChat ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <KeyboardBackspaceIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 3,
              }}
              onClick={() => setSelectedChat("")}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {selectedChat.isGroupChat ? (
                <>
                  <Typography variant="h4" align="left">
                    {selectedChat.chatName}
                  </Typography>
                  <UpdateGroupChatModal
                    selectedChat={selectedChat}
                    fetchChats={fetchChats}
                  >
                    <VisibilityIcon />
                  </UpdateGroupChatModal>
                </>
              ) : (
                <>
                  <Typography variant="h4" align="left">
                    {getSenderName(user, selectedChat.users)}
                  </Typography>
                  <Dialog user={getSender(user, selectedChat.users)}>
                    <VisibilityIcon />
                  </Dialog>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              height: "100%",
              borderRadius: 1.5,
              p: 3,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflowY: "hidden",
            }}
          >
            All messages here
          </Box>
        </>
      ) : (
        <Box
          justifyContent="center"
          height="100%"
          display="flex"
          alignItems="center"
        >
          <Typography variant="h4">Click on chat to select chatting</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
