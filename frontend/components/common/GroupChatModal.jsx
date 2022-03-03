import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ChatState } from "../../Context/ChatProvider";

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
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
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
          >
            Create Chat
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
