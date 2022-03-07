import {
  Box,
  Tooltip,
  Button,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../Context/ChatProvider";
import Dialog from "../components/common/Dialog";
// import Router from "next/router";
import { useRouter } from "next/router";

import ChatLoader from "../components/common/ChatLoader";
import UserListItem from "./User/UserListItem";

const SideDrawer = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [show, setShow] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropdown = Boolean(anchorEl);
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
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

  const accessChat = async (id) => {
    try {
      setLoadingChat(true);

      const data = await fetch(`http://localhost:4000/api/chat`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ userId: id }),
      }).then((res) => res.json());

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setLoadingChat(false);
      setSelectedChat(data);
      setOpenDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.primary",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Tooltip title="Search user to chat" arrow>
          <Button onClick={() => setOpenDrawer(true)}>
            <SearchIcon />
            <Typography sx={{ display: { xs: "none", md: "flex" }, px: 1 }}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography variant="h3">Tryouts</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NotificationsIcon />
          <Button
            id="basic-button"
            aria-controls={openDropdown ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDropdown ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Avatar sx={{ bgcolor: "orange", mx: 1 }} src={user.pic}>
              {user.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openDropdown}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Dialog user={user}>
              <MenuItem
                close={() => {
                  setAnchorEl(null);
                }}
              >
                My Profile
              </MenuItem>
            </Dialog>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "20%" },
            height: "100%",
            p: 3,
            backgroundColor: "background.primary",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            pb: 4,
            fontWeight: "bold",
          }}
        >
          Search Users
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            id="fullWidth"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => handleSearch()}
          >
            Go
          </Button>
        </Box>
        {loading ? (
          <ChatLoader />
        ) : (
          searchResult?.map((chat) => (
            <UserListItem
              key={chat._id}
              user={chat}
              handleSelect={() => accessChat(chat._id)}
            />
          ))
        )}
      </Drawer>
    </>
  );
};

export default SideDrawer;
