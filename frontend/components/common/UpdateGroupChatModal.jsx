import React, { useState, useEffect } from "react";
import { Stack, TextField, CircularProgress, Chip, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../User/UserListItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    // padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function UpdateGroupChatModal({
  selectedChat,
  fetchChats,
  children,
}) {
  const [open, setOpen] = useState(false);

  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleGroupNameUpdate = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/chat/rename`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          chatName: groupChatName,
          chatId: selectedChat._id,
        }),
      }).then((res) => res.json());
      fetchChats();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectedUsers(selectedChat.users);
  }, [selectedChat]);

  const handleSelect = async (selectedUser) => {
    if (
      !selectedUsers.find((user) => user._id === selectedUser._id) &&
      selectedChat.groupAdmin._id === user._id
    ) {
      setSelectedUsers([...selectedUsers, selectedUser]);
      try {
        const data = await fetch(`http://localhost:4000/api/chat/groupadd`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            userId: selectedUser._id,
            chatId: selectedChat._id,
          }),
        }).then((res) => res.json());
        fetchChats();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearch = async (search) => {
    setSearch(search);
    if (search) {
      try {
        setLoading(true);
        const data = await fetch(
          `http://localhost:4000/api/user?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        ).then((res) => res.json());
        setLoading(false);
        setSearchResult(data);
      } catch (error) {}
    }
  };

  const handleDelete = async (val) => {
    if (selectedChat.groupAdmin._id === user._id) {
      setSelectedUsers(selectedUsers.filter((user) => user._id !== val));
      try {
        const data = await fetch(`http://localhost:4000/api/chat/groupremove`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            userId: val,
            chatId: selectedChat._id,
          }),
        }).then((res) => res.json());
        fetchChats();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLeave = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/chat/groupremove`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          userId: user._id,
          chatId: selectedChat._id,
        }),
      }).then((res) => res.json());
      fetchChats();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {children && <span onClick={handleClickOpen}>{children}</span>}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "40%" },
            textAlign: "center",
            backgroundColor: "background.primary",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            {selectedChat.chatName}
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
              {selectedUsers
                ?.filter((users) => users._id !== user._id)
                .map((user) => (
                  <Chip
                    label={user.name.toUpperCase()}
                    onDelete={() => handleDelete(user._id)}
                    key={user._id}
                    color="primary"
                    sx={{ mx: 0.5 }}
                  />
                ))}
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <TextField
                fullWidth
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              ></TextField>
              <Button
                variant="contained"
                sx={{
                  width: "30%",
                  ml: 1,
                }}
                onClick={() => handleGroupNameUpdate()}
                disabled={!groupChatName}
              >
                Update
              </Button>
            </Box>
            <TextField
              fullWidth
              placeholder="Add Users Ex: John Doe"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            ></TextField>

            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleSelect={() => handleSelect(user)}
                  />
                ))
            )}
          </Stack>
          <Button
            variant="contained"
            color="error"
            sx={{
              width: "30%",
              mt: 3,
              marginLeft: "auto",
              marginRight: 0,
              display: "block",
            }}
            onClick={() => handleLeave()}
          >
            Leave Group
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
