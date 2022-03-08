import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Avatar,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getSenderName, getSender } from "./utils/chatsUtil";
import Dialog from "./common/Dialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateGroupChatModal from "./common/UpdateGroupChatModal";
import io from "socket.io-client";
import ScrollableFeed from "react-scrollable-feed";

const ENDPOINT = "http://localhost:4000";

var socket, selectedChatCompare;

const ChatBox = ({ fetchChats }) => {
  const { user, selectedChat, chats, setSelectedChat, setChats } = ChatState();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [connectedSocket, setConnectedSocket] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setNewMessage("");
    try {
      const data = await fetch(
        `http://localhost:4000/api/message/${selectedChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        }
      ).then((res) => res.json());
      setLoading(false);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
      // fetchChats();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setConnectedSocket(true));
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.keyCode === 13) {
      setLoading(true);
      try {
        const data = await fetch(`http://localhost:4000/api/message`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        }).then((res) => res.json());
        setLoading(false);
        setNewMessage("");
        setMessages([...messages, data]);
        socket.emit("new message", data);
        // fetchChats();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const typingHandler = () => {
    if (!connectedSocket) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedUser._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

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
            {loading ? (
              <CircularProgress
                color="primary"
                sx={{
                  alignSelf: "center",
                  margin: "auto",
                }}
                size={80}
              />
            ) : (
              <ScrollableFeed>
                {messages?.map((message) =>
                  message.sender._id === user._id ? (
                    <Box
                      key={message._id}
                      sx={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: 1,
                        width: "fit-content",
                        my: 1,
                        backgroundColor: "background.default",
                        color: "background.primary",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                      }}
                    >
                      {message.content}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={message.sender.pic || ""}
                        alt="Profile picture"
                        sx={{
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      <Box
                        key={message._id}
                        sx={{
                          alignSelf:
                            message.sender._id === user._id
                              ? "flex-end"
                              : "flex-start",
                          my: 1,
                          mx: 1,
                          backgroundColor: "background.primary",
                          color: "background.default",
                          borderRadius: 2,
                          px: 1.5,
                          py: 1,
                        }}
                      >
                        {message.content}
                      </Box>
                    </Box>
                  )
                )}
              </ScrollableFeed>
            )}
            {isTyping && (
              <CircularProgress
                color="primary"
                sx={
                  {
                    // alignSelf: "center",
                    // margin: "auto",
                  }
                }
                size={30}
              />
            )}
            <TextField
              fullWidth
              placeholder="Type your message here"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                typingHandler();
              }}
              onKeyDown={sendMessage}
            ></TextField>
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
