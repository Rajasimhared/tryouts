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
import { useTheme } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import Dialog from "../components/common/Dialog";
import Router from "next/router";
// import Drawer from "../components/common/Drawer";

const SideDrawer = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [show, setShow] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropdown = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    Router.push("/");
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
      console.log(data);
      setSearchResult(data);
    } catch (error) {}
  };

  const { user } = ChatState();

  console.log(user, openDrawer);
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
        <Box sx={{ display: "flex" }}>
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

        {searchResult[0]?.email}
      </Drawer>
    </>
  );
};

export default SideDrawer;
