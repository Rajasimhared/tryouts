import React, { useState } from "react";
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

export default function GroupChatModal({ children }) {
  const [open, setOpen] = useState(false);

  const [groupChatName, setGroupChatName] = useState();
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

  const handleSubmit = async () => {
    try {
      const data = await fetch(`http://localhost:4000/api/chat/group`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        }),
      }).then((res) => res.json());

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
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

  const handleDelete = (val) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== val));
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
            height: "35%",
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
            Create Group Chat
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            ></TextField>
            <TextField
              fullWidth
              placeholder="Add Users Ex: John Doe"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            ></TextField>
            <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
              {selectedUsers?.map((user) => (
                <Chip
                  label={user.name.toUpperCase()}
                  onDelete={() => handleDelete(user._id)}
                  key={user._id}
                  color="primary"
                  sx={{ mx: 0.5 }}
                />
              ))}
            </Box>
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
            sx={{
              width: "30%",
              mt: 3,
              marginLeft: "auto",
              marginRight: 0,
              display: "block",
            }}
            onClick={() => handleSubmit()}
            disabled={!groupChatName || selectedUsers.length < 2}
          >
            Create Chat
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
